 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const place_order = createAsyncThunk(
    'order/place_order',
    async({ price,products,shipping_fee,items,shippingInfo,userId,navigate}) => {
        try {
            const { data } = await api.post('/home/order/place-order',{
                price,products,shipping_fee,items,shippingInfo,userId,navigate
            })
            navigate('/payment',{
                state: {
                    price:price + shipping_fee,
                    items,
                    orderId: data.orderId 
                }
            })
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error(error.response)
        }
        
    }
)
// End Method 

export const get_orders = createAsyncThunk(
    'order/get_orders',
    async({customerId,status}, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/home/coustomer/get-orders/${customerId}/${status}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const get_order_details = createAsyncThunk(
    'order/get_order_details',
    async(orderId , { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/home/coustomer/get-order-details/${orderId}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 
 export const confirm_order = createAsyncThunk(
  'orders/confirm_order',
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/order/order_confirm/${orderId}`,
        {},
        { withCredentials: true }
      )
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const cart_item_delete = createAsyncThunk(
  'order/cart_item_delete',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete('/order/cart_item_delete', {
        withCredentials: true   // 🔥 MUST (cookie auth)
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const orderReducer = createSlice({
    name: 'order',
    initialState:{
        myOrders : [], 
        errorMessage : '',
        successMessage: '',  
        myOrder : {},
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
 
    },
    extraReducers: (builder) => {
        builder
        
        .addCase(get_orders.fulfilled, (state, { payload }) => { 
            state.myOrders = payload.orders; 
        })
        .addCase(get_order_details.fulfilled, (state, { payload }) => {
            state.myOrder = payload.order;
        })
         .addCase(confirm_order.rejected, (state, { payload }) => {
         state.errorMessage = payload.message
         })
       .addCase(confirm_order.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
       })
        .addCase(cart_item_delete.fulfilled, (state, { payload }) => {
    state.successMessage = "Cart cleared from DB"
})
.addCase(cart_item_delete.rejected, (state, { payload }) => {
    state.errorMessage = payload.error
})
    }
})
export const {messageClear} = orderReducer.actions
export default orderReducer.reducer