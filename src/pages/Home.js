import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getblogs, deleteblog, addblog, updateblog } from '../redux/slices/blogSlice'
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';

const Home = () => {
  const dispatch=useDispatch()
 const [updated,setupdatetask]=useState({})
const [visible,setvisible]=useState({visibility:"hidden"})
 const handleChange=(e)=>{
  setupdatetask({...blogList,[e.target.name]:e.target.value})
  console.log(updated)
}
 
 const {blogList,isLoading}=useSelector(state => state.blog)
 const { register, handleSubmit, formState: { errors } } = useForm();
 const onSubmit = data => {
  dispatch(addblog(data))
  console.log(data)};
 console.log(errors);
 useEffect(()=>{dispatch(getblogs())},[dispatch])
 console.log(getblogs())
  return (
    <div className='form'>
    <form  onSubmit={handleSubmit(onSubmit)}>
    <input type="text" placeholder="text" {...register('title')}/>
    <input type="text" placeholder="desc" {...register('description')}/>
    <input type="submit" />
  </form>
  {isLoading && <p>Loading</p>}
  {Array.isArray(blogList) && blogList.map(el=>
  <div>
    <p>{el.title}</p>
    <p>{el.description}</p>


    <button onClick={()=>{(visible.visibility==="hidden")
    ?   setvisible({visibility:"visible"}):setvisible({visibility:"hidden"})}}>update</button>

    <div style={visible}>
    <input type='text' placeholder='add name' name='title'onChange={handleChange}></input>
   <input type='text' placeholder='add description' name='description'onChange={handleChange}></input>
   <button onClick={()=>dispatch(updateblog({...updated,_id:el._id}))}>Updating</button>

    </div>

   
  
  <Button onClick={()=>dispatch(deleteblog(el))}>Delete</Button> 
   
  </div>
  )}
  </div>
  )
}

export default Home