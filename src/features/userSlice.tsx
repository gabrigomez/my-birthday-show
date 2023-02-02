import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Tracks } from '../utils/interfaces';

export interface UserState {
  token: string,
  haveAccess: boolean,
  tracks: Array<Tracks>,
};

const initialState: UserState = {
  token: '',
  haveAccess: false,
  tracks: [],
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {      
      state.token = action.payload;
      state.haveAccess = true;
    },
    getTracks: (state, action: PayloadAction<Array<Tracks>>) => {
      state.tracks.push(...action.payload);
    },  
  },
});

export const { login, getTracks } = userSlice.actions;

export default userSlice.reducer;