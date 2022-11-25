
import { configureStore } from "@reduxjs/toolkit";
import QuestionReducer from "./QuestionSlice";
const store=configureStore({
    questions:QuestionReducer
})
export default store