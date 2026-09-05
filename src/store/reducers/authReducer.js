 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/customer/customer-register',info)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async(info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/auth/seller-register', info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// End Method 

export const customer_login = createAsyncThunk(
    'auth/customer_login',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/customer-login', info, {
                withCredentials:true
            })

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const customer_google_login = createAsyncThunk(
    'auth/customer_google_login',
    async(access_token, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/google-login', { access_token }, {
                withCredentials: true
            })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const customer_facebook_login = createAsyncThunk(
    'auth/customer_facebook_login',
    async(access_token, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/facebook-login', { access_token }, {
                withCredentials: true
            })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async(_ ,{rejectWithValue, fulfillWithValue}) => {

        try {
            const {data} = await api.get('/get_user_info',{withCredentials: true})
            return fulfillWithValue(data)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error(error.response)
            return rejectWithValue(error.response.data)
        }
    }
)

const decodeToken = (token) => {
    if (token) {
        const userInfo = jwtDecode(token)
        return userInfo
    } else {
        return ''
    }
}
// End Method 
    export const logout = createAsyncThunk(
        'auth/logout',
        async(_,{rejectWithValue, fulfillWithValue}) => {
             
            try {
                const { data } = await api.get('/logout', { withCredentials: true })
                return fulfillWithValue(data)
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') console.error(error)
                return rejectWithValue(error.response.data)
            }
        }
    )


export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        loader: false,
        userLoaded:false,
        userInfo :null,
        errorMessage : '',
        successMessage: '', 
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
        user_reset: (state,_) => {
            state.userInfo =null
        }
 
    },
    extraReducers: (builder) => {
        builder
        .addCase(customer_register.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(customer_register.rejected, (state, { payload }) => {
            state.errorMessage = payload.error;
            state.loader = false;
        })
        .addCase(customer_register.fulfilled, (state, { payload }) => {
        
            state.successMessage = payload.message;
            state.loader = false;
            state.userInfo = payload.userInfo
        })
        .addCase(seller_register.pending, (state) => {
            state.loader = true;
        })
        .addCase(seller_register.rejected, (state, { payload }) => {
            state.errorMessage = payload?.error || "Registration failed";
            state.loader = false;
        })
        .addCase(seller_register.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message;
            state.loader = false;
        })
        .addCase(get_user_info.pending, (state) => {
            state.userLoaded = false;
            state.loader = true;
})    
        .addCase(get_user_info.fulfilled, (state, { payload }) => {
                    state.loader =false;
            state.userInfo = payload.userInfo;
            state.userLoaded = true;
        })
            .addCase(get_user_info.rejected, (state) => {
                state.userLoaded = true; // ✅ even if fail
                state.loader = false;
})
        .addCase(customer_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(customer_login.rejected, (state, { payload }) => {
            state.errorMessage = payload.error;
            state.loader =false;
        })
        .addCase(customer_login.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message;
            state.loader =false;
            state.userInfo =payload.userInfo
        })
        .addCase(customer_google_login.pending, (state) => {
            state.loader = true;
        })
        .addCase(customer_google_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload?.error || "Google sign-in failed";
        })
        .addCase(customer_google_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.userInfo = payload.userInfo;
        })
        .addCase(customer_facebook_login.pending, (state) => {
            state.loader = true;
        })
        .addCase(customer_facebook_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload?.error || "Facebook sign-in failed";
        })
        .addCase(customer_facebook_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.userInfo = payload.userInfo;
        })
                    .addCase(logout.fulfilled, (state) => {
                state.userInfo =null;
               
                state.successMessage = "Logged out successfully";
              });
    }
})
export const {messageClear,user_reset} = authReducer.actions
export default authReducer.reducer