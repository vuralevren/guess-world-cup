import { createSlice } from "@reduxjs/toolkit";
// Initial state
const initialState = {
  league: undefined,
};

export const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    createRequest() {},
    checkLeagueNameRequest() {},
    getLeagueBySlugRequest() {},

    setLeague(state, action) {
      state.league = action.payload;
    },
  },
});

export const leagueActions = leagueSlice.actions;

export default leagueSlice.reducer;
