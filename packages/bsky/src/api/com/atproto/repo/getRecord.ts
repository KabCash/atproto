import { InvalidRequestError } from '@atproto/xrpc-server'
import { AtUri } from '@atproto/syntax'
import { Server } from '../../../../lexicon'
import AppContext from '../../../../context'

export default function (server: Server, ctx: AppContext) {
  server.com.atproto.repo.getRecord({
    auth: ctx.authVerifier.optionalStandardOrRole,
    handler: async ({ auth, params }) => {
      console.log('handler 1')
      const { repo, collection, rkey, cid } = params
      console.log('handler 2')
      const { includeTakedowns } = ctx.authVerifier.parseCreds(auth)
      console.log('handler 3')
      const [did] = await ctx.hydrator.actor.getDids([repo])
      console.log('handler 4')
      if (!did) {
        console.log('handler 5')
        throw new InvalidRequestError(`Could not find repo: ${repo}`)
      }
      console.log('handler 6')

      const actors = await ctx.hydrator.actor.getActors([did], includeTakedowns)
      console.log('handler 7')
      if (!actors.get(did)) {
        console.log('handler 8')
        throw new InvalidRequestError(`Could not find repo: ${repo}`)
      }
      console.log('handler 9')
      const uri = AtUri.make(did, collection, rkey).toString()
      console.log('handler 10')
      const result = await ctx.hydrator.getRecord(uri, includeTakedowns)
      console.log('handler 11')

      if (!result || (cid && result.cid !== cid)) {
        console.log('handler 12')
        throw new InvalidRequestError(`Could not locate record: ${uri}`)
      }
      console.log('handler 13')

      return {
        encoding: 'application/json' as const,
        body: {
          uri: uri,
          cid: result.cid,
          value: result.record,
        },
      }
    },
  })
}
