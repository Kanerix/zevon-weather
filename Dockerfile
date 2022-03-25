FROM node:16.14.2-alpine3.15 AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /deps

COPY package.json yarn.lock .yarnrc.yml ./

COPY .yarn ./.yarn

RUN yarn install --immutable


FROM node:16.14.2-alpine3.15 AS builder

WORKDIR /build

COPY --from=deps /deps/node_modules ./node_modules

COPY . .

RUN yarn build


FROM node:16.14.2-alpine3.15 AS runner

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
