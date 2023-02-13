import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Tracks } from '../utils/interfaces';

export interface UserState {
  token: string | null,
  haveAccess: boolean,
  tracks: Array<Tracks>,
};

const token = localStorage.getItem('mybirthdayshow');

const initialState: UserState = {
  token: token,
  haveAccess: false,
  tracks: [],
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {      
      state.token = action.payload;
      localStorage.setItem('mybirthdayshow', state.token);
      state.haveAccess = true;
    },
    getTracks: (state, action: PayloadAction<Array<Tracks>>) => {
      state.tracks.push(...action.payload);
    },
  },
});

export const { login, getTracks } = userSlice.actions;

export default userSlice.reducer;