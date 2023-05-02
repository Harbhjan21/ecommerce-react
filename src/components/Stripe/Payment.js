import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./Checkout";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51N2pRrSC9BDHQjROnycesGnhTrNAgdA1NQMVDGEG9BMctoi0mx8azANiXgsD18ili6axWo8J1oBMLAcHE30CMs8T00AotU1eCC"
);

export default function Payment() {
  return (
    <div style={{ marginTop: "10%" }}>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
