import { useState } from "react";
import { useSelector } from "react-redux";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import "./payment-form.styles.scss";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;
    console.log("inside payment handler", clientSecret);

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
          address: {
            line1: "510 Townsend St",
            postal_code: "98140",
            city: "San Francisco",
            state: "CA",
            country: "US",
          },
        },
      },
    });

    setIsProcessingPayment(false);
    if (paymentResult.error) {
      console.log("error:", paymentResult.error);
      alert(`error ${paymentResult.error}`);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };
  return (
    <div className="paymentFormContainer">
      <form className="formContainer" onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="payNow" type="submit">
          Pay now
        </button>
        {/* <Button
          isLoading={isProcessingPayment}
          class
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </Button> */}
      </form>
    </div>
  );
};
export default PaymentForm;
