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
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
