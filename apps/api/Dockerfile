FROM node:20-alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

ENV PRISMA_CLI_BINARY_TARGETS=linux-musl-openssl-3.0.x
RUN pnpm prisma generate

RUN pnpm build



FROM node:20-alpine as production

RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

EXPOSE 3000

CMD ["npm", "run", "start"]
