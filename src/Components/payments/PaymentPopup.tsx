'use client';

import React, { useState } from "react";
import Image from "next/image";
import CardInputElement from "./CardElement";
import CloseIcon from "../../../public/imcross.svg"; // put your cross.svg in public folder
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface PaymentPopupProps {
    selectedPlanData?: { name: string; price: number };
    onClose?: () => void;
    onChangePlan?: () => void;
    onSubmit?: () => void;
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
export default function PaymentPopup({
    selectedPlanData,
    onClose,
}: PaymentPopupProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async () => {
        if (!stripe || !elements) return;

        setLoading(true);
        setErrorMessage("");

        try {
            // 1. Ask backend for clientSecret
            const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: (selectedPlanData?.price || 14) * 100 }), // cents
            });
            // console.log("res", res);

            const { clientSecret } = await res.json();

            // console.log("clientSecret", typeof clientSecret);
            // 2. Confirm card payment
            const result = await stripe!.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements!.getElement(CardElement)!,
                },
            });

            // console.log("result", result);

            if (result.error) {
                setErrorMessage(result.error.message || "Payment failed");
            } else if (result.paymentIntent?.status === "succeeded") {
                alert("🎉 Payment successful!");
                onClose?.();
            }
            debugger
        } catch (err: any) {
            setErrorMessage(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="bg-white rounded-lg p-5 w-[95%] sm:w-[500px] shadow-xl">
            {/* CLOSE ICON  */}
            <div className="flex justify-between items-center">
                <h4 className="text-[#1A2956] font-semibold">Billing Information</h4>
                <Image
                    src={CloseIcon}
                    alt="close"
                    className="cursor-pointer"
                    width={20}
                    height={20}
                    onClick={onClose}
                />
            </div>

            {/* USER INFO */}
            <div className="mt-2">
                <h5 className="mb-0 text-[#A3A9BB]">Hello, User 👋</h5>
                <h4 className="text-[#1A2956]">Your Free Trial Has Expired</h4>
            </div>

            {/* PRICE */}
            <div className="flex items-end mt-3">
                <h2 className="text-[#41CCAD] text-3xl font-bold">
                    ${selectedPlanData?.price || 14}
                </h2>
                <h4 className="text-[#41CCAD]">.00</h4>
                <h6 className="text-[#41CCAD] ml-1">
                    USD{" "}
                    <span className="text-[#A3A9BB]">/month/entity</span>
                </h6>
            </div>

            <div className="w-full h-[1px] bg-[#E9EAEF] my-3"></div>

            {/* CHARGES */}
            <p className="text-[#A3A9BB]">
                Subscription Charges:{" "}
                <span className="text-[#41CCAD] font-semibold">
                    ${selectedPlanData?.price}.00 USD
                </span>{" "}
                <span className="text-black">/month</span>
            </p>
            <p className="text-[#A3A9BB]">
                Billed Today:{" "}
                <span className="text-[#41CCAD] font-semibold">
                    ${selectedPlanData?.price}.00 USD
                </span>
            </p>

            {/* ADDRESS */}
            <div className="mt-3 space-y-3">
                <input
                    type="text"
                    placeholder="Full Address"
                    className="w-full h-10 rounded-md border px-3 border-[#E9EAEF] font-medium text-sm"
                />
                <input
                    type="text"
                    placeholder="City"
                    className="w-full h-10 rounded-md border px-3 border-[#E9EAEF] font-medium text-sm"
                />
                <input
                    type="text"
                    placeholder="State"
                    className="w-full h-10 rounded-md border px-3 border-[#E9EAEF] font-medium text-sm"
                />
                <input
                    type="text"
                    placeholder="Postal Code"
                    className="w-full h-10 rounded-md border px-3 border-[#E9EAEF] font-medium text-sm"
                />
                <input
                    type="text"
                    placeholder="Country"
                    className="w-full h-10 rounded-md border px-3 border-[#E9EAEF] font-medium text-sm"
                />
                <div className="block w-full p-[10px] border border-divider rounded mt-3">
                    <CardInputElement />
                </div>
            </div>

            {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            {/* BUTTON */}
            <div className="mt-4">
                <button
                    onClick={handleSubmit}
                    disabled={!stripe || loading}
                    className="bg-[#41CCAD] text-white w-full h-11 rounded-md hover:bg-[#36b699] transition disabled:opacity-50"
                >
                    {loading ? "Processing..." : "Upgrade Subscription"}
                </button>
            </div>
        </div>
    );
}
