import {sleep} from "./sleep";

/**
 * Fetch with rate-limit handling (429) and transient retry/backoff.
 */
export async function request(requestUrl, requestOptions = {}, backOffOptions = {}) {
  let {
    maxRetries = 5,
    baseDelayMs = 1000,
    maxDelayMs = 12_000,
    retryOnStatuses = new Set([429]),
    retryOnNetworkError = true,
    cancellationSignal = requestOptions.signal, // Abort signal
    onRetry
  } = backOffOptions;

  let retry = 0;
  let lastResponse;
  let lastException;

  while (retry <= maxRetries) {
    lastResponse = undefined;
    lastException = undefined;

    try {
      lastResponse = await fetch(requestUrl, { ...requestOptions, signal: cancellationSignal });
      if (!retryOnStatuses.has(lastResponse.status)) {
        if (retry > 0)
          console.log(`Request to ${requestUrl} succeeded after ${retry}/${maxRetries} retries.`);
        return lastResponse;
      }
    } catch (e) {
      if (e?.name === "AbortError" || !retryOnNetworkError)
        throw e;
      lastException = e;
      lastResponse = undefined;
    }

    retry++;
    if (retry > maxRetries)
      break;

    console.error(`Request to ${requestUrl} failed, will retry ${retry}/${maxRetries}. `, lastResponse ?? lastException);
    await backOff({
      url: requestUrl,
      response: lastResponse,
      exception: lastException,
      retry,
      baseDelayMs,
      maxDelayMs,
      onRetry,
      cancellationSignal
    });
  }

  console.error(`Request to ${requestUrl} exhausted ${maxRetries}`, lastResponse ?? lastException);
  throw lastResponse ?? lastException ?? new Error("Request exhausted retries");
}

async function backOff({
    url, response, exception, retry,
    baseDelayMs, maxDelayMs, onRetry,
    cancellationSignal
  }) {

  let retryDelayMs;
  if (!!response && !exception)
    retryDelayMs = getBackOffInMs({
      response,
      retry,
      baseDelayMs,
      maxDelayMs,
    });
  else
    retryDelayMs = computeBackoffWithJitter(retry, baseDelayMs, maxDelayMs);

  if (onRetry) {
    onRetry({
      url,
      status: response?.status ?? "NETWORK_ERROR",
      retry: retry,
      delayMs: retryDelayMs,
      retryAfter: response?.headers?.get("retry-after"),
      error: exception?.toString() ?? undefined
    });
  }

  await sleep(retryDelayMs, cancellationSignal);
}

function getBackOffInMs({ response, retry, baseDelayMs, maxDelayMs }) {
  const retryAfterMs = getRetryAfterInMs(response);
  const retryAfterIsValid = Number.isFinite(retryAfterMs) && retryAfterMs >= 0;
  if (retryAfterIsValid) {
    const retryAfterJittered = retryAfterMs + Math.random() * 200;
    return clamp(retryAfterJittered, 0, maxDelayMs);
  }

  return computeBackoffWithJitter(retry, baseDelayMs, maxDelayMs);
}

function computeBackoffWithJitter(retry, baseDelayMs, maxDelayMs) {
  // Exponential backoff base * 2^attempt
  const backOff = baseDelayMs * Math.pow(2, retry);
  const jitteredBackOff = Math.random() * backOff;
  return clamp(jitteredBackOff, baseDelayMs, maxDelayMs);
}

function getRetryAfterInMs(response) {
  const retryAfter = response.headers.get("retry-after");
  if (!retryAfter) return NaN;

  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds))
    return seconds * 1000;

  const asDate = Date.parse(retryAfter);
  if (Number.isFinite(asDate))
    return asDate - Date.now();

  return NaN;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

