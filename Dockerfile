FROM node:16-alpine3.14 AS builder

COPY package.json yarn.lock


FROM node:16-alpine3.14 AS runner
