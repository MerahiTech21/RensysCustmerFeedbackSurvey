import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.css'
const ForgotPassword = () =>{
 const [email, setEmail] = useState('')
 const [error,setError] = useState('')

 const navigate=useNavigate()
    
 const emailHandler = (e) =>{
  console.log('erro',error)
        setEmail(e.target.value)
     }
     const validate = (value) =>{
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      var errorValues =''
      if(!value){
        errorValues = 'Email is Required'
      }
      else if(!regexExp.test(value)){
        errorValues = 'Invalid Email Address'
      }

      return errorValues
     }
    const forgotHandler =(e) =>{
         e.preventDefault()
       const err=validate(email)
        setError(err)
       if(!err){
              navigate('/verify-otp')

       }
    }
    return <div className={`${classes.wraper} p-5`}>
<Form>
<Form.Group className="mb-4" controlId="loginemail">
  <Form.Label className='fw-bold'>Email address</Form.Label>
  <Form.Control 
  type="email" 
  placeholder="name@example.com"
  name='email'
  value={email}
  className={error ? classes.errorBorder:''}
  onChange={emailHandler}
   />
   <span className={classes.errorText}>{error}</span> 
</Form.Group>

<Button className={`${classes.btn} w-100 mb-1`} variant='none' onClick={forgotHandler}>Send Email</Button>
</Form>
<div className='d-flex justify-content-end mt-4'>
<Link to={'/login'}>Login</Link>
</div>
</div>
}
export default ForgotPassword