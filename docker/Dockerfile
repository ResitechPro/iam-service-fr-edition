# Development Stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    npm install -g @nestjs/cli && \
    pnpm install

COPY .env nest-cli.json tsconfig.build.json tsconfig.json ./
COPY migrations ./migrations
COPY src ./src

CMD ["npm", "run", "start:dev"]

# Production Stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    npm install -g @nestjs/cli && \
    pnpm install --production

COPY --from=development /app/dist ./dist

EXPOSE 3002

CMD ["node", "./dist/main.js"]