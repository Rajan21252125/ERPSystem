import { createSlice }  from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        books: []
    },
    reducers: {
        getUserData: (state,action) => {
            state.user = action.payload
        },
        getBookData : (state,action) => {
            state.books = action.payload
        }
        
    }
})


export const { getUserData , getBookData } = userSlice.actions
export default userSlice.reducer