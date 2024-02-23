import {configureStore} from '@reduxjs/toolkit';

import rootReducer from "./slices/userSlice";
import blogReducer from "./slices/blogSlice";
export default configureStore({reducer:{user: rootReducer,blog:blogReducer}})