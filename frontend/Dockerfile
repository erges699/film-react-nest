# Этап 1: сборка фронтенда
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY .env.example ./.env

RUN npm install

COPY . .

RUN npm run build
