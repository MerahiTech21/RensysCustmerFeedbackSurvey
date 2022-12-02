const ValidateSurvey = (values) =>{
    const errors = {}
    if(!values.name?.trim()){
        errors.name = 'Survey Name is Required'
    }if(!values.description?.trim()){
        errors.description = 'Survey Description is Required'
    }
    if(!values.openingAt?.trim()){
        errors.openingAt = 'Opening Date Required'
    }
    if(!values.closingAt?.trim()){
        errors.closingAt = 'Closing Date Required'
    }
    
    return errors
}
export default ValidateSurvey