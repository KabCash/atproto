FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app
COPY ./*.* ./
# NOTE bsky's transitive dependencies go here: if that changes, this needs to be updated.
COPY ./tsconfig ./tsconfig
COPY ./packages/bsky ./packages/bsky
COPY ./packages/api ./packages/api
COPY ./packages/common ./packages/common
COPY ./packages/common-web ./packages/common-web
COPY ./packages/crypto ./packages/crypto
COPY ./packages/identity ./packages/identity
COPY ./packages/sync ./packages/sync
COPY ./packages/syntax ./packages/syntax
COPY ./packages/lexicon ./packages/lexicon
COPY ./packages/repo ./packages/repo
COPY ./packages/xrpc ./packages/xrpc
COPY ./packages/xrpc-server ./packages/xrpc-server
COPY ./services/bsky ./services/bsky
COPY ./services/data-plane ./services/data-plane

# Copy the global .env file to the bsky folder so it can be used by dotenv
COPY ./.env ./services/data-plane/.env


RUN pnpm install --frozen-lockfile
RUN pnpm build
RUN rm -rf node_modules
RUN pnpm install --prod --shamefully-hoist --frozen-lockfile --prefer-offline

WORKDIR /app/services/data-plane

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
