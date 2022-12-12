import { createSlice } from "@reduxjs/toolkit";

export const tabKeySlice=createSlice({
    name:'question',
    initialState:{key:''},
    reducers:{
        setKey:(state,action)=>{
          state.key=action.payload
        },
  
    }
});

export const responseAction=tabKeySlice.actions
export default tabKeySlice.reducer