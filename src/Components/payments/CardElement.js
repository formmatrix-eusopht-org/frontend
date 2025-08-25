import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: { color: "#32325d", fontSize: "16px" },
    invalid: { color: "#fa755a" },
  },
};

export default function CardInputElement() {
  return <CardElement options={CARD_ELEMENT_OPTIONS} />;
}
