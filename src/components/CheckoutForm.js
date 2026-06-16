import React, { useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { clear_cart, clear_cart_db } from "../store/reducers/cardReducer";
import { useDispatch } from "react-redux";
import { confirm_order } from "../store/reducers/orderReducer";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ orderId }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 'idle' | 'success' | 'error' — drives which view we show.
  const [status, setStatus] = useState("idle");

  const paymentElementOptions = {
    layout: "tabs",
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isLoading) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    // 1) Stripe-side failure (declined card, validation, etc.)
    if (error) {
      setStatus("error");
      setMessage(
        error.type === "card_error" || error.type === "validation_error"
          ? error.message
          : "An unexpected error occurred. Your card was not charged.",
      );
      setIsLoading(false);
      return;
    }

    // 2) Async payment methods may still be processing.
    if (paymentIntent && paymentIntent.status === "processing") {
      setMessage(
        "Your payment is processing. We'll update your order once it completes.",
      );
      setIsLoading(false);
      return;
    }

    // 3) Success — confirm the order on our backend BEFORE clearing the cart,
    // so an order-confirmation failure doesn't wipe the cart for a payment we
    // can no longer reconcile.
    if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await dispatch(confirm_order(orderId)).unwrap();
        await dispatch(clear_cart_db()).unwrap();
        dispatch(clear_cart());
        localStorage.removeItem("card_products");

        setStatus("success");
        setMessage("Payment successful! Your order has been placed. 🎉");
      } catch (err) {
        setStatus("error");
        setMessage(
          `Payment succeeded, but we couldn't confirm your order. Please contact support and reference order #${orderId}.`,
        );
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // 4) Anything else (e.g. requires_action that wasn't handled).
    setStatus("error");
    setMessage("Payment could not be completed. Please try again.");
    setIsLoading(false);
  };

  // Success view: the user stays here and explicitly continues, instead of
  // being redirected before they can see the result.
  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex justify-center items-center text-3xl">
          ✅
        </div>
        <h2 className="text-2xl font-bold text-green-700">
          Payment Successful
        </h2>
        <p className="text-slate-600">{message}</p>
        <button
          onClick={() => navigate("/dashboard/my-orders")}
          className="px-8 py-2 rounded-sm bg-green-700 text-white hover:shadow-lg hover:shadow-green-700/30"
        >
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} id="payment-form">
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="mt-4 px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span id="button-text">{isLoading ? "Processing…" : "Pay Now"}</span>
      </button>

      {message && (
        <div
          className={`mt-3 text-sm ${
            status === "error" ? "text-red-600" : "text-slate-600"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
