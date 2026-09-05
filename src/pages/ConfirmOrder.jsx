import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import error from "../assets/error.png";
import success from "../assets/success.png";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import api from "../api/api";
import { STRIPE_PUBLISHABLE_KEY } from "../config/app";

const load = async () => {
  return await loadStripe(STRIPE_PUBLISHABLE_KEY);
};

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("succeeded");
          break;
        case "processing":
          setMessage("processing");
          break;
        case "requires_payment_method":
          setMessage("failed");
          break;
        default:
          setMessage("failed");
      }
    });
  }, [stripe]);

  const get_load = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };

  useEffect(() => {
    get_load();
  }, []);

  const update_payment = async () => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      try {
        await api.get(`/order/order_confirm/${orderId}`);
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    if (message === "succeeded") {
      update_payment();
    }
  }, [message]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {message === "failed" || message === "processing" ? (
        <>
          <img src={error} alt="" />
          <Link
            className="px-6 py-2.5 bg-gradient-to-r from-[#059473] to-[#047857] hover:shadow-lg hover:shadow-emerald-500/30 rounded-lg font-semibold text-white transition-all"
            to="/dashboard/my-orders"
          >
            Back to Dashboard{" "}
          </Link>
        </>
      ) : message === "succeeded" ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <img src={success} alt="" />
            <Link
              className="px-6 py-2.5 bg-gradient-to-r from-[#059473] to-[#047857] hover:shadow-lg hover:shadow-emerald-500/30 rounded-lg font-semibold text-white transition-all"
              to="/dashboard/my-orders"
            >
              Back to Dashboard{" "}
            </Link>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;
