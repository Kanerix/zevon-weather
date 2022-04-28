FROM node:16-slim AS deps

WORKDIR /deps

COPY package.json yarn.lock .yarnrc.yml ./

COPY .yarn ./.yarn

RUN yarn install --immutable


FROM node:16-slim AS builder

RUN apt update
RUN apt install -y openssl

WORKDIR /build

COPY --from=deps /deps/node_modules ./node_modules

COPY . .

RUN yarn prisma generate

RUN yarn build


FROM node:16-slim AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /build/next.config.js ./
COPY --from=builder /build/src/public ./public
COPY --from=builder /build/package.json ./

COPY --from=builder --chown=nextjs:nodejs /build/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /build/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
