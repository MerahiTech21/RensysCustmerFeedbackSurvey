import {createSlice} from '@reduxjs/toolkit'
import { allSurvey } from "../../sample-data/SampleData";

const surveySlice = createSlice({
    name:'survey',
    initialState:{surveys:[],selectedSurvey:{}},
    reducers:{
        setSurveys(state,action){
            state.surveys = action.payload
        }, 
        addSurvey:(state,action)=>{
            state.surveys.push(action.payload)
        },
        editSurvey:(state,action)=>{
            const index = state.surveys.findIndex(survey=>survey.id*1===action.payload.id*1)
            state.surveys[index] = action.payload 
        }, 
        deleteSurvey:(state,action)=>{
            const index= state.surveys.findIndex(survey=>survey.id*1 ===action.payload*1)
           state.surveys.splice(index,1)
        },
        setSelectedSurvey:(state,action)=>{
           state.selectedSurvey=action.payload
        },
        changeSurveyStatus:(state,action)=>{
            const index = state.surveys.findIndex(survey=>survey.id*1===action.payload.id*1)
            state.surveys[index] = action.payload 
        }
    


    }
})
export const surveyAction = surveySlice.actions
export default surveySlice.reducer