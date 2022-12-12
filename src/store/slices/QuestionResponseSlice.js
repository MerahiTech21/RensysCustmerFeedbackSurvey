import { createSlice } from "@reduxjs/toolkit";

export const responseSlice=createSlice({
    name:'question',
    initialState:{responses:[],individualResponses:[]},
    reducers:{
        setResponses:(state,action)=>{
          state.responses=action.payload
        },
        setIndividualResponses:(state,action)=>{
          state.individualResponses=action.payload
        },
        deleteUserResponse:(state,action)=>{
          state.individualResponses.splice(action.payload*1,1)
        }
    }
});

export const responseAction=responseSlice.actions
export default responseSlice.reducer