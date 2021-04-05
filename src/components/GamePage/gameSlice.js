import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        score: 0,
        cityCoords: {},
        stage: 1,
        markerCoords: {},
        cityName: "",
    },
    reducers: {
        updateScore: (state, action) => {
            state.score += action.payload;
        },
        updateCity: (state, action) => {
            state.cityCoords = action.payload;
        },
        updateMarker: (state, action) => {
            state.markerCoords = action.payload;
        },
        updateStage: (state) => {
            state.stage += 1;
        },
    },
});

export const { updateScore, updateCity, updateMarker, updateStage } = gameSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//     setTimeout(() => {
//         dispatch(incrementByAmount(amount));
//     } 1000);
// };

// The function below is called a selector and allows us to select a score from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.score)`
export const selectScore = (state) => state.game.score;
export const selectStage = (state) => state.game.stage;
export const selectCity = (state) => state.game.cityCoords;
export const selectMarker = (state) => state.game.markerCoords;

export default gameSlice.reducer;
