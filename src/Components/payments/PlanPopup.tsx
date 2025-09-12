"use client";

import React from "react";

export interface Plan {
    name: string;
    description: string;
    price: number;
    features: string[];
    color: string;
}

interface PlanPopupProps {
    username: string;
    onClose: () => void;
    onSelectPlan: (plan: { name: string; price: number, color: string }) => void;
    plans: Plan[];
    CheckIcon?: React.ReactNode;
    CloseIcon?: React.ReactNode;
    className?: string;
}

const PlanPopup: React.FC<PlanPopupProps> = ({
    username,
    onClose,
    onSelectPlan,
    plans,
    CheckIcon = <span>✔</span>,
    CloseIcon = <span>✖</span>,
    className = "",
}) => {
    const borderColor = "1px solid #E9EAEF";

    return (
        <div className={`bg-white rounded-lg p-5 w-[98%] lg:w-[70%] ${className}`}>
            {/* CLOSE ICON */}
            <div className="w-full flex justify-end cursor-pointer" onClick={onClose}>
                {CloseIcon}
            </div>

            {/* USER NAME */}
            <div className="mt-[-1rem] mb-2">
                <h5 className="mb-1 text-[#A3A9BB]">
                    Hello, {username.charAt(0).toUpperCase() + username.slice(1)}! 👋
                </h5>
                <h4 className="text-[#1A2956]">Your Free Trial Has Expired</h4>
                <p className="mt-1 text-[#A3A9BB]">Choose a plan to get started</p>
            </div>

            {/* PLAN CARDS */}
            <div className="flex items-start gap-x-3 mt-5 overflow-x-auto w-full">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        style={{ border: borderColor }}
                        className="flex-1 min-w-[18rem] sm:min-w-[20rem] md:min-w-[17rem] p-3 rounded-md pb-9"
                    >
                        {/* Headings */}
                        <div>
                            <h5 className="text-[#1A2956]">{plan.name}</h5>
                            <p className="mt-1 text-[#A3A9BB]">{plan.description}</p>
                        </div>

                        {/* Price */}
                        <div className="flex items-end mt-6">
                            <h2 className="text-[#41CCAD] text-3xl font-bold">${plan.price}</h2>
                            <h4 className="text-[#41CCAD]">.00</h4>
                        </div>

                        {/* Button */}
                        <div>
                            <button
                                onClick={() => onSelectPlan(
                                    plan
                                )}
                                className={`w-full h-[2.6rem] rounded-md text-white bg-[#41CCAD] mt-3 ${plan.color}`}
                            >
                                Get Started
                            </button>
                        </div>

                        {/* Features */}
                        <div className="mt-3">
                            {plan.features.length > 0 ? (
                                plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-x-3 items-center mb-2">
                                        {CheckIcon}
                                        <p>{feature}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[#A3A9BB]">No extra features</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanPopup;
