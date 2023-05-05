import React from "react";
import {
  useStripe,
  useElements,
  CardElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

import CardSection from "./Cardsection";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector((state) => state.profile.price);
  console.log("amount", amount);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: "Jenny Rosen",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
    });

    stripePaymentMethodHandler(result);
  };

  //handler

  const stripePaymentMethodHandler = async (result) => {
    if (result.error) {
      // Show error in payment form
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 4)
      const res = await fetch("http://13.235.69.72:3030/auth/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
          amount,
        }),
      });
      const paymentResponse = await res.json();

      // Handle server response (see Step 4)
      handleServerResponse(paymentResponse);
    }
  };

  //serverresponse
  const handleServerResponse = async (response) => {
    if (response.error) {
      console.log(response.error);
      window.location.assign("/cancle");

      // Show error from server on payment form
    } else if (response.requires_action) {
      console.log("in action field");
      // Use Stripe.js to handle the required card action
      const { error: errorAction, paymentIntent } =
        await stripe.handleCardAction(response.payment_intent_client_secret);

      if (errorAction) {
        console.log("in error action");
        // Show error from Stripe.js in payment form
        window.location.assign("/cancle");
      } else {
        console.log("conforming");
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        const serverResponse = await fetch(
          "http://13.235.69.72:3030/auth/payment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
          }
        );
        handleServerResponse(await serverResponse.json());
      }
    } else {
      // Show success message
      window.location.assign("/success");
    }
  };

  return (
    <div
      style={{
        border: "2px solid black",
        padding: "5px",
        margin: "10%",
        textAlign: "center",
        width: "50%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button style={{ marginTop: "3%" }} type="submit" disabled={!stripe}>
          Submit Payment
        </button>
      </form>
    </div>
  );
}
