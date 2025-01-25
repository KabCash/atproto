FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app
COPY . .

RUN pnpm install --frozen-lockfile > /dev/null
RUN pnpm build > /dev/null
RUN rm -rf node_modules
RUN pnpm install --prod --shamefully-hoist --frozen-lockfile --prefer-offline > /dev/null

RUN apk add --update dumb-init runit
ENTRYPOINT ["dumb-init", "--"]

EXPOSE 3001
ENV PORT=3001
ENV NODE_ENV=production

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node
CMD ["node", "--heapsnapshot-signal=SIGUSR2", "--enable-source-maps", "data-plane.js"]

LABEL org.opencontainers.image.source=https://github.com/bluesky-social/atproto
LABEL org.opencontainers.image.description="Bsky Data Plane"
LABEL org.opencontainers.image.licenses=MIT
