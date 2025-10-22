FROM node:alpine

RUN apk update && apk add nginx && mkdir /www
COPY nginx.conf /etc/nginx/http.d/default.conf

EXPOSE 80

WORKDIR /app
COPY . .
RUN npm install

RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]
