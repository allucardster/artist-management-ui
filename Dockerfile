FROM node:14-alpine as builder

# install and cache app dependencies
COPY package.json yarn.lock ./
RUN yarn install && mkdir /react-frontend && mv ./node_modules ./react-frontend

WORKDIR /react-frontend

COPY . .

RUN yarn run build

# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:stable-alpine
COPY --from=builder /react-frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]