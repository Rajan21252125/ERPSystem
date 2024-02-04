import { createSlice }  from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
    },
    reducers: {
        getUserData: (state,action) => {
            state.user = action.payload
        },
        
    }
})


export const { getUserData } = userSlice.actions
export default userSlice.reducer