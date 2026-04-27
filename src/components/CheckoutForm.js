import React, { useState } from 'react';
 import axios from 'axios'
import { PaymentElement,LinkAuthenticationElement,useStripe,useElements } from '@stripe/react-stripe-js' 
import { clear_cart,clear_cart_db } from '../store/reducers/cardReducer';
import { useDispatch ,useSelector} from 'react-redux';
import api from '../api/api';
import { confirm_order, cart_item_delete } from "../store/reducers/orderReducer"
import { useNavigate } from 'react-router-dom'; 

const CheckoutForm = ({ orderId }) => {
    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.auth);
    const userId = userInfo?._id
    
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const dispatch=useDispatch()

    const paymentElementOptions = {
        layout: 'tabs'
    }

    const submit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)
        const { error,paymentIntent} = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        })
        if (error) {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message)
            } else {
                setMessage('An Unexpected error occured')
            }
        }
        else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // ✅ Payment success
             setIsSuccess(true);
            setMessage('Payment Successful! 🎉');
            await dispatch(confirm_order(orderId))
        
            await dispatch(clear_cart_db());
             await  dispatch(clear_cart())
             localStorage.removeItem('card_products');

    navigate('/dashboard/my-orders')
    }

        setIsLoading(false)
    }


    return (
        <form onSubmit={submit} id='payment-form'>
            <LinkAuthenticationElement id='link-authentication-element'/>
            <PaymentElement id='payment-element' options={paymentElementOptions} />

            <button disabled={isLoading || !stripe || !elements} id='submit' className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>
                <span id='button-text'>
                    {
                        isLoading ? <div>Loading...</div> : "Pay Now"
                    }
                </span> 
            </button>
               {message && <div>{message}</div>}
        </form>
    );
};

export default CheckoutForm;