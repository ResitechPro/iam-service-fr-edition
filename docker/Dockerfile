# Development Stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm install

COPY nest-cli.json tsconfig.build.json tsconfig.json ./
COPY migrations ./migrations
COPY src ./src

CMD ["npm", "run", "start:dev"]
