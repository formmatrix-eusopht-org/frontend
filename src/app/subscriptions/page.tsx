'use client'
import SubscriptionTable from '@/ui/SubscribtionTable';
import '../globals.css';
import { useEffect, useState } from 'react';


export default function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const fetchSubscriptions = async (uid: string | null) => {
        if (!uid) return console.log("uid Not Found");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get_user_subscriptions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid }),
            });

            const data = await res.json();

            // map backend fields → UI fields
            const formatted = data.map((sub: any) => ({
                _id: sub._id,
                planName: sub.planType || "N/A",
                price: sub.price || 0, // if you don’t store price, you can resolve via Stripe API
                billingCycle: sub.planType?.toLowerCase().includes("daily")
                    ? "daily"
                    : sub.planType?.toLowerCase().includes("monthly")
                        ? "monthly"
                        : "custom",
                startDate: sub.currentPeriodStart,
                endDate: sub.currentPeriodEnd,
                status: sub.status,
            }));

            setSubscriptions(formatted);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    };
    const handleCancelSubscription = (subscriptionId: string) => {
        // Call API to cancel subscription
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cancel_subscription`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subscriptionId }),
        })
            .then((res) => res.json())
            .catch((error) => {
                console.error("Error canceling subscription:", error);
            });
    };
    useEffect(() => {
        const uid = localStorage.getItem("uid");
        fetchSubscriptions(uid);
    }, []);

    return (
        <>
            <div className="flex bg-gray-100">
                <SubscriptionTable subscriptions={subscriptions} onCancel={handleCancelSubscription} />
            </div>
        </>
    )
}