import * as bsky from '@atproto/bsky'


// shared across server, ingester, and indexer in order to share pool, avoid too many pg connections.
const db = new bsky.Database({
url: "postgresql://pg:password@db:5432/postgres",
schema: "public",
poolSize: 10,
})


await db.migrateToLatestOrThrow()


const dataplane = await bsky.DataPlaneServer.create(
    db,
    3001,
    "https://plc.directory",
)

const sub = new bsky.RepoSubscription({
    service: "wss://uc9c995tn0ad6.ngrok.app",//"wss://social.kabcash.com",
    db,
    idResolver: dataplane.idResolver,
})

console.log('About to start sub sub')
sub.start();

console.log('Started subscription repo')
