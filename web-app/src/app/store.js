import { configureStore } from '@reduxjs/toolkit'
import webrtcReducer from '../features/webrtc/webrtcSlice'

export default configureStore({
  reducer: {
    webrtc: webrtcReducer,
  },
})
