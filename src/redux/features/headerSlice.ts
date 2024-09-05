import { createSlice } from "@reduxjs/toolkit";

export interface  HeaderState {
    subTitle: string;
    searchBar:string;
}

export const initialState = {
    subTitle : "",
    searchBar : "",
}

export const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setSubTitle(state, action){
            state.subTitle = action.payload;
        },
        setSearchBar(state, action){
            state.searchBar = action.payload;
        },
    }
 });

 export const { setSubTitle, setSearchBar} = headerSlice.actions;

 export default headerSlice.reducer;