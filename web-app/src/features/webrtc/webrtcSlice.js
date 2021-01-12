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
    identifier: null,
  },
  reducers: {
    initialized(state, action) {
      state.stage = Stages.Idle
      state.identifier = action.payload
    },
    reset(state) {
      state.stage = Stages.Uninitialized
      state.identifier = null
    },
  },
})

export const { initialized, reset } = webrtcSlice.actions

export const selectIsStageUninitialized = (state) =>
  state.webrtc.stage === Stages.Uninitialized

export const selectIdentifier = (state) => state.webrtc.identifier

export default webrtcSlice.reducer
