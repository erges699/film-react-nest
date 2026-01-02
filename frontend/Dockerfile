# Этап 1: сборка фронтенда
FROM node:20-alpine as frontend-builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Этап 2: настройка Nginx
FROM nginx:alpine as nginx-server

RUN rm -rf /usr/share/nginx/html/*

COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx (если есть)
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

