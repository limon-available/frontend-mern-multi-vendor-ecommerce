import React, { useState } from 'react';
 import axios from 'axios'
import { PaymentElement,LinkAuthenticationElement,useStripe,useElements } from '@stripe/react-stripe-js' 
import { clear_cart } from '../store/reducers/cardReducer';
import { useDispatch ,useSelector} from 'react-redux';
import api from '../api/api';
 
 
const CheckoutForm = ({ orderId }) => {

    const {userInfo
} = useSelector((state) => state.auth);
const userId = userInfo?.id
console.log("userID",userInfo)
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
            dispatch(clear_cart())
            
             localStorage.removeItem('card_products');
            const response = await api.delete('/order/card_item_delete', { data: { userId } });
     console.log("in checkout",response)
   
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