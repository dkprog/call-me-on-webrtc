import Server from 'socket.io'
import dotenv from 'dotenv-defaults'
import faker from 'faker'

let server
let peerIds = new Map()

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
  socket.handshake.peerId = generatePeerID()
  peerIds.set(socket.handshake.peerId, socket.id)
  socket.join(socket.handshake.peerId)
  socket.on('disconnect', onDisconnect.bind(this, socket))
  console.log('Peer connected', {
    socketId: socket.id,
    peerId: socket.handshake.peerId,
  })
  socket.emit('peer-id', socket.handshake.peerId)
}

function onDisconnect(socket) {
  console.log('Peer disconnected', {
    socketId: socket.id,
    peerId: socket.handshake.peerId,
  })

  if (socket.handshake.peerId) {
    peerIds.delete(socket.handshake.peerId)
  }
}

function generatePeerID() {
  let peerId

  do {
    const a = faker.git.branch()
    const b = faker.address.zipCode()
    peerId = `${a}-${b}`
  } while (peerIds.has(peerId))

  return peerId
}
