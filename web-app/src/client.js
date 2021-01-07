import io from 'socket.io-client'
const socket = io(process.env.REACT_APP_SIGNALING_SERVER_ADDR, {
  transports: ['websocket'],
})
export default socket
