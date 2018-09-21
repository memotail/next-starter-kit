const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const compress = require('koa-compress')

require('dotenv').config({
  path: path.resolve(process.cwd(), '.env', `${process.env.NODE_ENV}.env`)
})

const dev = process.env.NODE_ENV === 'development'
const port = process.env.PORT || 3000

const app = next({
  dev,
  dir: './src'
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
  let server = new Koa()
  const router = new Router()

  if (!dev) {
    // gzip
    server.use(compress({
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    }))
  }

  router.get('*', async ctx => {
    // if (rootStaticFiles.indexOf(ctx.req.url) > -1) {
    //   const staticPath = path.join(__dirname, 'static', ctx.req.url)
    //   await send(ctx, staticPath)
    // } else {
    //   await handle(ctx.req, ctx.res)
    // }
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(router.routes())

  server.listen(port, '0.0.0.0', (err) => {
    if (err) throw err

    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
