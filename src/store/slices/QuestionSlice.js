import { createSlice } from "@reduxjs/toolkit";

export const questionSlice=createSlice({
    name:'question',
    initialState:{questions:[]},
    reducers:{
        setQuestions:(state,action)=>{
          state.questions=action.payload.questions
        },
        addQuestion:(state,action)=>{
          state.questions.push(action.payload)
        },
        deletedQuestion:(state,action)=>{
          const index=state.questions.findIndex((q)=>q.id*1 === action.payload*1)
          state.questions.splice(index,1)

        }
    }
});

export const questionAction=questionSlice.actions
export default questionSlice.reducer