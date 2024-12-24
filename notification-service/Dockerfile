FROM node:20.18.1-alpine AS builder
WORKDIR /app
COPY --chown=node:node ./ .
RUN npm install --no-interactive
RUN npm run build

FROM node:20.18.1-alpine AS runner
WORKDIR /app
RUN apk add curl traceroute openssl
RUN apk upgrade openssl --no-cache

COPY --chown=node --from=builder /app/dist ./dist
COPY --chown=node --from=builder /app/src/prisma/generated ./dist/prisma/generated
COPY --chown=node --from=builder /app/node_modules ./node_modules
COPY --chown=node --from=builder /app/tsconfig.json ./tsconfig.json
COPY --chown=node --from=builder /app/bin ./bin
COPY --chown=node --from=builder /app/src ./src
COPY --chown=node --from=builder /app/package.json ./package.json
COPY --chown=node --from=builder /app/package-lock.json ./package-lock.json
COPY --chown=node --from=builder /app/.env .en

USER node
EXPOSE 3000

CMD ["npm", "run", "start"]
