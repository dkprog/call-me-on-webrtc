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
  socket.on('helo', onHelo.bind(this, socket))
  socket.on('disconnect', onDisconnect.bind(this, socket))
  socket.on('call', onCall.bind(this, socket))
  console.log('Peer connected', {
    socketId: socket.id,
  })
}

function onHelo(socket, ack) {
  if (socket.handshake.peerId) {
    peerIds.delete(socket.handshake.peerId)
  }
  socket.handshake.peerId = generatePeerID()
  ack(socket.handshake.peerId)
  console.log('Peer identified', {
    socketId: socket.id,
    peerId: socket.handshake.peerId,
  })
}

function generatePeerID() {
  let peerId

  do {
    const a = faker.git.branch()
    const b = faker.random.number()
    peerId = `${a}-${b}`
  } while (peerIds.has(peerId))

  return peerId
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

function onCall(socket, payload) {
  if (!socket.handshake.peerId) {
    return
  }
  if (!('peerId' in payload)) {
    return
  }
  if (!peerIds.has(payload.peerId)) {
    server.to(socket.id).emit('peer-not-found', { peerId: payload.peerId })
    return
  }
  const toSocketId = peerIds.get(payload.remotePeerId)
  if (toSocketId === socket.id) {
    server.to(socket.id).emit('peer-not-found', { peerId: payload.peerId })
    return
  }
  const fromPeerId = socket.handshake.peerId
  socket.to(toSocketId).emit('call', fromPeerId)
}
