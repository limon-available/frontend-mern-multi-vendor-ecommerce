 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const get_category = createAsyncThunk(
    'product/get_category',
    async(_, { fulfillWithValue,rejectWithValue }) => {
        try {
            const {data} = await api.get('/home/get-categorys')
            return fulfillWithValue(data)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 
export const get_products = createAsyncThunk(
    'product/get_products',
    async(_, { fulfillWithValue,rejectWithValue}) => {
        try {
            const {data} = await api.get('/home/get-products')
            return fulfillWithValue(data)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 


export const get_price_range = createAsyncThunk(
    'product/get_price_range',
    async(_, { fulfillWithValue,rejectWithValue}) => {
        try {
            const {data} = await api.get('/home/get_price_range')
            return fulfillWithValue(data)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const query_products = createAsyncThunk(
    'product/query_products',
    async(query , { fulfillWithValue,rejectWithValue}) => {
        try {
            const { data } = await api.get('/home/query-products', {
  params: {
    category: query.category,
    rating: query.rating,
    low: query.low,
    high: query.high,
    sortPrice: query.sortPrice,
    pageNumber: query.pageNumber,
    searchValue: query.searchValue || ''
  }
});
            return fulfillWithValue(data)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const product_details = createAsyncThunk(
    'product/product_details',
    async(slug, { fulfillWithValue,rejectWithValue }) => {
        try {
            const {data} = await api.get(`/home/product-details/${slug}`)
            return fulfillWithValue(data)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async(info, { fulfillWithValue,rejectWithValue}) => {
        try {
            const {data} = await api.post('/home/customer/submit-review',info)
            return fulfillWithValue(data)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 


export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async({productId, pageNumber}, { fulfillWithValue,rejectWithValue}) => {
        try {
            const {data} = await api.get(`/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`)
            return fulfillWithValue(data)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 


export const get_banners = createAsyncThunk(
    'banner/get_banners',
    async( _ , { fulfillWithValue,rejectWithValue}) => {
        try {
            const {data} = await api.get(`/banners`)
            return fulfillWithValue(data)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') console.error(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 




export const homeReducer = createSlice({
    name: 'home',
    initialState:{
        categorys : [],
        products : [],
        totalProduct : 0,
        parPage: 3,
        latest_product : [],
        topRated_product : [],
        discount_product : [],
        priceRange : {
            low: 0,
            high: 0
        },
        product: {},
        relatedProducts: [],
        moreProducts: [],
        errorMessage : '',
        successMessage: '',
        totalReview: 0,
        rating_review: [],
        reviews : [],
        banners: [] 
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
 
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_category.fulfilled, (state, { payload }) => {
            state.categorys = payload.categorys;
        })
        .addCase(get_products.fulfilled, (state, { payload }) => {
            state.products = payload.products;
            state.latest_product = payload.latest_product;
            state.topRated_product = payload.topRated_product;
            state.discount_product = payload.discount_product;
        })
       .addCase(get_price_range.pending, (state) => {
             state.loader = true;
       })
            .addCase(get_price_range.fulfilled, (state, { payload }) => {
                state.priceRange=payload.priceRange
        }  )  
        .addCase(query_products.fulfilled, (state, { payload }) => { 
            state.products = payload.products;
            state.totalProduct = payload.totalProduct;
            state.parPage = payload.parPage; 
        })

        .addCase(product_details.fulfilled, (state, { payload }) => { 
            state.product = payload.product;
            state.relatedProducts = payload.relatedProducts;
            state.moreProducts = payload.moreProducts; 
        })

        .addCase(customer_review.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message;
        })

        .addCase(get_reviews.fulfilled, (state, { payload }) => {
            state.reviews = payload.reviews;
            state.totalReview = payload.totalReview;
            state.rating_review = payload.rating_review;
        })

        .addCase(get_banners.fulfilled, (state, { payload }) => {
            state.banners = payload.banners; 
        })

    }
})
export const {messageClear} = homeReducer.actions
export default homeReducer.reducer