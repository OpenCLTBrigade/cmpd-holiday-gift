const { FuseBox, EnvPlugin } = require('fuse-box')
const TypeHelper = require('fuse-box-typechecker').TypeHelper

const typeHelper = TypeHelper({
  tsConfig: '../tsconfig.json',
  basePath: './server',
  name: 'Typechecker',
  yellowOnOptions: true
})

const server = FuseBox.init({
  sourceMaps: true,
  target: 'server',
  homeDir: 'server/',
  output: 'build/server/$name.js',
  plugins: [
    EnvPlugin({
      NODE_ENV: 'development'
    })
  ]
})

server.dev({ port: 4455, httpServer: false })

server
  .bundle('server')
  .watch('server/**') // watch only server related code.. bugs up atm
  .instructions(' > [server.ts]')
  // launch and restart express
  .completed(proc => {
    proc.start()

    // typeHelper.runSync()
  })

server.run()
