import { configureStore } from "@reduxjs/toolkit";
import QuestionReducer from "./slices/QuestionSlice";
import SurveyReducer from "./slices/ServeySlice";
import BtnSpinerReducer from "./slices/ButtonSpinerSlice";
import UserReducer from "./slices/UserSlice";
import IsLoadingReducer from './spinerSlice'

const store = configureStore({
  reducer: {
    question: QuestionReducer,
    survey: SurveyReducer,
    btn: BtnSpinerReducer,
    user:UserReducer,
    loading:IsLoadingReducer,

  },
});
export default store;
