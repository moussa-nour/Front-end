import {createSlice} from '@reduxjs/toolkit'
import{ createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const signup = createAsyncThunk(
    "user/signup", async(info, {rejecteWithValue}) =>{
        try{
            const res = await axios.post('/register',info)
            return res.data
        }
        catch(error){
            return rejecteWithValue(error.response.data.msg)
            //{console.log(error.response.data.msg)}
        }
    }
    )


    export const signin = createAsyncThunk(
        "user/signin", async(info, {rejecteWithValue}) =>{
            try{
                const res = await axios.post('/login',info)
                return res.data
            }
            catch(error){
                return rejecteWithValue(error.response.data.msg)
                //{console.log(error.response.data.msg)}
            }
        }
        )



const userSlice = createSlice({
        name:"user",
        initialState:{
            count : 0,
            isLoading: false,
            token: localStorage.getItem("token") || null ,
            isAuth : Boolean(localStorage.getItem("isAuth")) || null ,
            userList :[],
            errors : null,
            
        },
        reducers:{
            increment:(state)=>{state.count= state.count+1},
            logout : (state) => {
                state.isAuth = false
                state.token = null 
                localStorage.removeItem("isAuth")
                localStorage.removeItem("token")
    }
        },
        extraReducers:{
            [signup.pending]: (state) =>{state.isLoading = true},
            [signup.fulfilled]: (state,action) =>{
                state.isLoading = false
                state.isAuth = true 
                state.token = action.payload.token
                state.errors = null 
                state.userList = action.payload.user
                localStorage.setItem("isAuth", state.isAuth)
                localStorage.setItem("token", state.token)


            },
            [signup.rejected]: (state,action) =>{
                state.isLoading = false
                state.isAuth = false
                state.token = null
                state.errors = action.payload
            },
            [signin.pending]: (state) =>{state.isLoading = true},
            [signin.fulfilled]: (state,action) =>{
                state.isLoading = false
                state.isAuth = true 
                state.token = action.payload.token
                state.errors = null 
                state.userList = action.payload.user
                localStorage.setItem("isAuth", state.isAuth)
                localStorage.setItem("token", state.token)


            },
            [signin.rejected]: (state,action) =>{
                state.isLoading = false
                state.isAuth = false
                state.token = null
                state.errors = action.payload
            }
        }

})

export default userSlice.reducer
export const {increment, logout} = userSlice.actions