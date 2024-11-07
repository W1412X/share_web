FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
#配置证书
COPY ./certs/cert.pem /etc/ssl/certs/
COPY ./certs/privkey.pem /etc/ssl/private/
COPY ./certs/chain.pem /etc/ssl/certs/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]