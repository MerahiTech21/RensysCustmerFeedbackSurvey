import { createSlice } from "@reduxjs/toolkit";

export const questionSlice=createSlice({
    name:'questions',
    initialState:[],
    reducers:{
        questionSaved:(action,payload)=>{

        },
        questionDeleted:(action,payload)=>{

        }
    }
});

export const questionAction=questionSlice.actions
export default questionSlice.reducer