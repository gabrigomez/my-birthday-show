import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Tracks } from '../utils/interfaces';

export interface UserState {
  token: string,
  haveAccess: boolean,
  tracks: Array<Tracks>,
  monthTracks: Array<Tracks>
};

const initialState: UserState = {
  token: '',
  haveAccess: false,
  tracks: [],
  monthTracks: []
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
    getMonthTracks: (state, action: PayloadAction<Array<Tracks>>) => {
      state.monthTracks.push(...action.payload);
    },
    clearTracks: (state) => {
      state.tracks = []
    }  
  },
});

export const { login, getTracks, getMonthTracks, clearTracks } = userSlice.actions;

export default userSlice.reducer;