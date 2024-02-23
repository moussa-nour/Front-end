import {createSlice} from '@reduxjs/toolkit'
import{ createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const getblogs = createAsyncThunk(
    "/blog/getblogs", async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get("/blog/getblogs", {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            return res.data
        

        } catch (error) {
            return rejectWithValue(error.response.data.msg)
           
        }
    }
)

export const addblog = createAsyncThunk(
    "/blog/addblog", async (info, {rejectWithValue,dispatch}) => {
        try {
            const res = await axios.post("/blog/addblog",info, {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            dispatch(getblogs())
            return res.data

        } catch (error) {
            return rejectWithValue(error.response.data.msg)
            //  console.log(error.response.data.msg)
        }
    }
)
export const deleteblog = createAsyncThunk(
    "/blog/deleteblog", async (userId, {rejectWithValue,dispatch}) => {
        try {
            const res = await axios.delete(`/blog/deleteblog/${userId._id}`, {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            dispatch(getblogs())
            return res.data

        } catch (error) {
            return rejectWithValue(error.response.data.msg)
            //  console.log(error.response.data.msg)
        }
    }
)

export const updateblog = createAsyncThunk(
    "/blog/updateblog", async (userId, {rejectWithValue,dispatch}) => {
        try {
            const res = await axios.put(`/blog/updateblog/${userId._id}`,userId, {
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            dispatch(getblogs())
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.msg)
            //  console.log(error.response.data.msg)
        }
    }
)
const blogSlice = createSlice({
    name : "blog",
    initialState: {
        isLoading: false,
        taskList: [{title:"",
        description:""}],
        errors: null
    },
   
    extraReducers: {
        //GEt User Task
        [getblogs.pending]: (state) => {state.isLoading= true },

        [getblogs.fulfilled]: (state, action) => {
            state.isLoading= false 
            state.errors = null
            state.blogList = action.payload.blogs

        },

        [getblogs.rejected]: (state, action) => {
            state.isLoading= false 
            state.blogList = []
            state.token = null
            state.errors = action.error
        },

//delete Task
        [deleteblog.pending]: (state) => {state.isLoading= true },

        [deleteblog.fulfilled]: (state, action) => {
            state.isLoading= false 
            state.errors = null
            state.blogList = action.payload

        },

        [deleteblog.rejected]: (state, action) => {
            state.isLoading= false 
            state.isAuth = false
            state.token = null
            state.errors = action.error
        },
        
    }
})

export default blogSlice.reducer