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
  },
})

export const { initialized } = webrtcSlice.actions

export const selectIsStageUninitialized = (state) =>
  state.webrtc.stage === Stages.Uninitialized

export default webrtcSlice.reducer
