import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { isEmpty } from "lodash";
import { API_ROOT } from "~/utils/constants";
import { generatePlaceholderCard } from "~/utils/formatter";
import { mapOrder } from "~/utils/sorts";

const initialState = {
    currentActiveBoard: null,
};

// Actions call api (async) and update data to redux. Use middleware createAsyncThunk with extraReducers

export const fetchBoardDetailsAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailsAPI',
    async (boardId) => {
        const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`);
        return res.data;
    }
)

// Init a slice in redux store

export const activeBoardSlice = createSlice({
    name: 'activeBoard',
    initialState,
    // Where to handle synchronous data
    reducers: {
        updateCurrentActiveBoard: (state, action) => {
            // action.payload is the data receiver into reducer
            const fullBoard = action.payload;
            state.currentActiveBoard = fullBoard;
        }
    },
    // Extra reducers: Where to handle asynchronous data
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
            // action.payload is the res.data
            let board = action.payload;

            board.columns = mapOrder(board.columns, board.column_order_ids, 'id');
            board.columns.forEach(column => {
                if(isEmpty(column.cards)){
                    column.cards = [generatePlaceholderCard(column)];
                    column.card_order_ids = [generatePlaceholderCard(column).id];
                } else {
                    column.cards = mapOrder(column.cards, column.card_order_ids, 'id');
                }
            })
            
            state.currentActiveBoard = board;
        })
    }
});

// Action is where components below call dispatch() to update data through reducer (synch)

export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

// Selector is where components below call by useSelector() hook to take the data from redux store and use
export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currentActiveBoard
}

// export default activeBoardSlice.reducer;
export const activeBoardReducer = activeBoardSlice.reducer;
