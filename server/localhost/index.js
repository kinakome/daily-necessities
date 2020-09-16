const express = require("express")
const consola = require("consola")
const { Nuxt, Builder } = require("nuxt")
const app = express()
const https = require("https")
const fs = require("fs")

// Import and Set Nuxt.js options
const config = require("../../nuxt.config.js")

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  try {
    const builder = new Builder(nuxt)
    await builder.build()
  } catch (error) {
    console.error(error)
    return false
  }

  // https config
  const https_options = {
    key: fs.readFileSync(`${__dirname}/localhost-key.pem`),
    cert: fs.readFileSync(`${__dirname}/localhost.pem`),
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  https.createServer(https_options, app).listen(port, host)
  consola.ready({
    message: `Server listening on https://${host}:${port}`,
    badge: true,
  })
}
start()
