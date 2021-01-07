import Server from 'socket.io'
import dotenv from 'dotenv-defaults'

let server

dotenv.config()
main()

function main() {
  const { PORT } = process.env
  server = Server(PORT, {
    pingTimeout: 5000,
    transports: ['websocket'],
  })
  server.on('connect', onConnect)
  console.log(`Signaling server has started on port ${PORT}...`)
}

function onConnect(socket) {
  console.log('Peer connected', { socketId: socket.id })
}
