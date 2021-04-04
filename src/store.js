import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./components/GamePage/gameSlice";

export default configureStore({
    reducer: {
        game: gameReducer,
    },
});
