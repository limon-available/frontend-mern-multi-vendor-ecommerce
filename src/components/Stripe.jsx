import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import api from "../api/api";
import { STRIPE_PUBLISHABLE_KEY } from "../config/app";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Stripe = ({ price, orderId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: "stripe",
  };
  const options = {
    appearance,
    clientSecret,
  };

  const create_payment = async () => {
    try {
      const { data } = await api.post("/order/create-payment", { price });
      setClientSecret(data.clientSecret);
    } catch (error) {
      setClientSecret("");
    }
  };

  return (
    <div className="mt-4">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      ) : (
        <button
          onClick={create_payment}
          className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white"
        >
          Start Payment
        </button>
      )}
    </div>
  );
};

export default Stripe;
