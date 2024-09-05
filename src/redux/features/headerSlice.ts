import { TCourse } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

export interface HeaderState {
    subTitle: string;
    searchBar: string;
    lastAdded: TCourse[];
    lastRemoved: TCourse[];
}

export const initialState: HeaderState = {
    subTitle: "",
    searchBar: "",
    lastAdded: [],
    lastRemoved: []
}

export const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setSubTitle(state, action) {
            state.subTitle = action.payload;
        },
        setSearchBar(state, action) {
            state.searchBar = action.payload;
        },
        setLastAdded(state, action) {
            state.lastAdded = [...state.lastAdded, action.payload];
        },
        clearLastAdded(state) {
            state.lastAdded = [];
        },
        addRemoveCourse(state, action) {
            state.lastRemoved = [...state.lastRemoved, action.payload];
        },
        clearRemoved(state) {
            state.lastRemoved = [];
        }

    }
});

export const { setSubTitle, setSearchBar, setLastAdded, clearLastAdded, addRemoveCourse, clearRemoved } = headerSlice.actions;

export default headerSlice.reducer;