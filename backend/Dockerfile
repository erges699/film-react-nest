FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY .env.example ./.env

RUN npm ci --only=production \
    && npm cache clean --force

RUN rm -rf /app/node_modules/.bin/*

EXPOSE 3000

CMD ["node", "dist/main.js"]