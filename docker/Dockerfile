# Development Stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    npm install -g @nestjs/cli && \
    pnpm install

COPY nest-cli.json tsconfig.build.json tsconfig.json ./
COPY migrations ./migrations
COPY src ./src

EXPOSE 3002

CMD ["npm", "run", "start:dev"]
