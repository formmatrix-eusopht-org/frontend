"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CloseIcon from "../../../public/imcross.svg";
import { countries } from "@/Data/countries";
import AutoCompleteInput from "@/ui/AutoCompleteInput";
import toast from "react-hot-toast";

interface PaymentPopupProps {
    user?: any;
    selectedPlanData?: { name: string; price: number, color: string };
    onClose?: () => void;
    setShowSubscriptionPopup?: (show: boolean) => void;
}

export default function PaymentPopup({
    user,
    selectedPlanData,
    onClose,
    setShowSubscriptionPopup
}: PaymentPopupProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [address, setAddress] = useState({
        line1: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        countryName: "",
        autoSubscribe: true,
    });

    const validateAddress = () => {
        if (!address.line1.trim()) return "Address line is required";
        if (!address.city.trim()) return "City is required";
        if (!address.state.trim()) return "State is required";
        if (!address.postal_code.trim()) return "Postal code is required";
        if (!/^[A-Za-z0-9\s-]+$/.test(address.postal_code))
            return "Invalid postal code";
        if (!address.country) return "Country is required";
        return null;
    };

    const handleSubmit = async () => {
        if (!stripe || !elements) {
            console.warn("Stripe.js has not loaded yet");
            return;
        }

        const validationError = validateAddress();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            // 1. Create a PaymentMethod
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                console.error("CardElement not found");
                setErrorMessage("Card input not found");
                setLoading(false);
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                    email: user.email,
                    address: {
                        line1: address.line1,
                        city: address.city,
                        state: address.state,
                        postal_code: address.postal_code,
                        country: address.country,
                    },
                },
            });

            if (error) {
                console.error("Stripe createPaymentMethod error:", error);
                setErrorMessage(error.message || "Payment method failed");
                setLoading(false);
                return;
            }

            // 2. Ask backend to create subscription/order
            const bodyPayload = {
                email: user.email,
                address: {
                    line1: address.line1,
                    city: address.city,
                    state: address.state,
                    postal_code: address.postal_code,
                    country: address.country,
                },
                userId: user.firebase_uid,
                name: user.name,
                priceId: selectedPlanData?.name,
                paymentMethodId: paymentMethod.id,
                autoSubscribe: address.autoSubscribe,
            };

            const res = await fetch(
                process.env.NEXT_PUBLIC_API_BASE_URL + "/api/subscribe_user",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyPayload),
                }
            );

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (!res.ok) {
                setErrorMessage("Payment failed");
                setLoading(false);
                return;
            }

            toast.success(
                "Your request for subscription is sent! Please check your email for confirmation."
            );
            onClose?.();
            setShowSubscriptionPopup?.(false);
            window.location.reload();
        } catch (err: any) {
            console.error("handleSubmit error:", err);
            setErrorMessage(err.message);
        }

        setLoading(false);
    };


    return (
        <div className="bg-white rounded-lg p-5 w-[95%] sm:w-[500px] shadow-xl">
            {/* CLOSE ICON */}
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
            {/* <div className="mt-2">
        <h5 className="mb-0 text-[#A3A9BB]">
          Hello,{" "}
          {user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}! 👋
        </h5>
        <h4 className="text-[#1A2956]">Your Free Trial Has Expired</h4>
      </div> */}

            {/* PRICE */}
            {/* <div className="flex items-end mt-3">
        <h2 className="text-[#41CCAD] text-3xl font-bold">
          ${selectedPlanData?.price || 0}
        </h2>
        <h4 className="text-[#41CCAD]">.00</h4>
        <h6 className="text-[#41CCAD] ml-1">USD</h6>
      </div> */}

            <div className="w-full h-[1px] bg-[#E9EAEF] my-3"></div>

            {/* CHARGES */}
            <p className="text-[#A3A9BB]">
                Subscription Charges:{" "}
                <span className="text-[#41CCAD] font-semibold">
                    ${selectedPlanData?.price}.00 USD
                </span>
            </p>
            {/* <p className="text-[#A3A9BB]">
        Billed Today:{" "}
        <span className="text-[#41CCAD] font-semibold">
          ${selectedPlanData?.price}.00 USD
        </span>
      </p> */}

            {/* ADDRESS */}
            <div className="mt-3 space-y-3">
                <input
                    type="text"
                    placeholder="Full Address"
                    value={address.line1}
                    onChange={(e) => {
                        setAddress({ ...address, line1: e.target.value });
                        setErrorMessage("");
                    }}
                    className="w-full h-10 rounded-md border px-3 border-[#E9EAEF] font-medium text-sm"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => {
                        setAddress({ ...address, city: e.target.value });
                        setErrorMessage("");
                    }}
                    className="w-full h-10 rounded-md border px-3 border-[#E9EAEF] font-medium text-sm"
                />
                <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => {
                        setAddress({ ...address, state: e.target.value });
                        setErrorMessage("");
                    }}
                    className="w-full h-10 rounded-md border px-3 border-[#E9EAEF] font-medium text-sm"
                />
                <input
                    type="text"
                    placeholder="Postal Code"
                    value={address.postal_code}
                    onChange={(e) => {
                        setAddress({ ...address, postal_code: e.target.value });
                        setErrorMessage("");
                    }}
                    className="w-full h-10 rounded-md border px-3 border-[#E9EAEF] font-medium text-sm"
                />
                <AutoCompleteInput
                    options={countries}
                    value={address.countryName}
                    onChange={(val) => {
                        const selected = countries.find((c) => c.name === val);
                        if (selected) {
                            setAddress({
                                ...address,
                                country: selected.code,
                                countryName: selected.name,
                            });
                        } else {
                            setAddress({ ...address, country: "", countryName: val });
                        }
                    }}
                />
                <div className="block w-full p-[10px] border border-divider rounded mt-3">
                    <CardElement />
                </div>
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={address.autoSubscribe}
                        onChange={() =>
                            setAddress({ ...address, autoSubscribe: !address.autoSubscribe })
                        }
                        className="h-3 w-3 rounded border-gray-300 text-[#41CCAD] focus:ring-[#41CCAD]"
                    />
                    <span className="text-sm text-gray-700">
                        Auto-Subscribe Next Time
                    </span>
                </label>
            </div>

            {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            {/* BUTTON */}
            <div className="mt-4">
                <button
                    onClick={handleSubmit}
                    disabled={!stripe || loading}
                    className={`bg-[#41CCAD] text-white w-full h-11 rounded-md hover:bg-[#36b699] transition disabled:opacity-50 ${loading ? "cursor-not-allowed" : "cursor-pointer"} ${selectedPlanData?.color}`}
                >
                    {loading ? "Processing..." : "Upgrade Subscription"}
                </button>
            </div>
        </div>
    );
}
