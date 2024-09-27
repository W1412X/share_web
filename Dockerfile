# 使用 Node.js 作为构建阶段的基础镜像
FROM node:20 AS build
# 设置工作目录
WORKDIR /app
# 复制 package.json 和 package-lock.json
COPY package*.json ./
# 设置 npm 镜像（使用淘宝镜像）
RUN npm config set registry https://registry.npmmirror.com/
# 安装依赖
RUN npm install
# 复制所有文件并构建项目
COPY . .
# 构建项目
RUN npm run build
# 使用 nginx 作为生产环境的服务器
FROM nginx:alpine
# 复制构建的文件到 nginx 的 html 目录
COPY --from=build /app/dist /usr/share/nginx/html
# 复制 SSL 证书到 nginx 的合适位置
COPY ./certs/cert.pem /etc/ssl/certs/
COPY ./certs/privkey.pem /etc/ssl/private/
COPY ./certs/chain.pem /etc/ssl/certs/
# Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 暴露端口
EXPOSE 80 443

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
