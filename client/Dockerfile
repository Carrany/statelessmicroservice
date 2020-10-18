FROM node:14-slim as builder

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install
COPY . .

RUN yarn build

# stage 2 - build the final image and copy the react build files
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# new
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000 80
CMD ["nginx", "-g", "daemon off;"]