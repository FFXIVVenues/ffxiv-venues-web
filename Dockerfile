FROM node:18 as build
ARG test=false

WORKDIR /app
COPY . .
RUN npm install

RUN if [ "$test" = "true" ]; \
    then npm run build:test; \
    else npm run build; \
    fi

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]