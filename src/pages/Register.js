
import { React,  useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signup} from '../redux/slices/userSlice'; 
import './style.css'

const Register = () => {

        const { isAuth , errors: err } = useSelector(state => state.user)
        console.log("isAuth", isAuth)
        const dispatch = useDispatch()
        const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data =>  {console.log(data);
    dispatch(signup(data))
}
    console.log("errors", errors);
    useEffect(() => {
      if(isAuth) navigate('/')
  }, [isAuth, navigate])

  return (
    <div className='formm'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="name" {...register("name", {required: true, max: 20, min: 8, maxLength: 20})} /><br/>
      <p>{errors.name && "name is required"}</p>
      <input type="email" placeholder="email" {...register("email", {required: true, max: 20, min: 10, maxLength: 29})} /><br/>
      <p>{errors.email && "email is not valid"}</p>
      <p>{err && "email exist please try to login"}</p>
      <input type="password" placeholder="password" {...register("password", {required: true, max: 20, min: 5, maxLength: 12, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i})} /><br/>
      <p>{errors.password && "password incorrect"}</p>
      <input type="submit"/>
    </form>
    </div>
  )
}

export default Register
