import { createSlice } from '@reduxjs/toolkit'

export const Stages = Object.freeze({
  Uninitialized: 'Uninitialized',
  Idle: 'Idle',
  Calling: 'Calling',
  Receiving: 'Receiving',
  Establishing: 'Establishing',
  OnCall: 'OnCall',
  Error: 'Error',
})

export const webrtcSlice = createSlice({
  name: 'webrtc',
  initialState: {
    stage: Stages.Uninitialized,
    localIdentifier: null,
    remoteIdentifier: null,
    isVideoEnabled: false,
    isAudioEnabled: false,
    errorMessage: null,
  },
  reducers: {
    initialized(state, action) {
      state.stage = Stages.Idle
      state.localIdentifier = action.payload.localIdentifier
    },
    callingStarted(state, action) {
      const { remoteIdentifier, isVideoEnabled } = action.payload
      if (!remoteIdentifier) {
        return
      }
      state.stage = Stages.Calling
      state.remoteIdentifier = remoteIdentifier
      state.isVideoEnabled = isVideoEnabled
      state.isAudioEnabled = true
    },
    failed(state, action) {
      state.stage = Stages.Error
      state.errorMessage = action.payload
    },
    reset(state) {
      state.stage = Stages.Uninitialized
      state.localIdentifier = null
      state.remoteIdentifier = null
      state.isVideoEnabled = false
      state.isAudioEnabled = false
      state.errorMessage = null
    },
  },
})

export const {
  initialized,
  callingStarted,
  failed,
  reset,
} = webrtcSlice.actions

export const selectLocalIdentifier = (state) => state.webrtc.localIdentifier

export const selectIsUninitialized = (state) =>
  state.webrtc.stage === Stages.Uninitialized

export const selectIsCalling = (state) => state.webrtc.stage === Stages.Calling

export const selectIsFormLocked = (state) =>
  state.webrtc.stage === Stages.Uninitialized ||
  state.webrtc.stage === Stages.Calling ||
  state.webrtc.stage === Stages.Establishing

export const selectFailed = (state) => state.webrtc.stage === Stages.Error

export const selectErrorMessage = (state) => state.webrtc.errorMessage

export default webrtcSlice.reducer
