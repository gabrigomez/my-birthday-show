import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  token: string,
};

const initialState: UserState = {
  token: '',
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = action.payload
    },    
  },
  extraReducers(builder) {

  },
})

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions

export default userSlice.reducer