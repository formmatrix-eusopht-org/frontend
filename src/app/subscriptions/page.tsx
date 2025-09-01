'use client'
import SubscriptionTable from '@/ui/SubscribtionTable';
import '../globals.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserAuth } from '@/Contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface AuthUser {
    subscriptionID?: string;
    [key: string]: any;
}
export default function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const { user }: { user: AuthUser | null; } = UserAuth()

    const fetchSubscriptions = async () => {
        if (!user?.subscriptionID) {
            console.log("Subscription ID Not Found", user?.subscriptionID);
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get_user_subscriptions`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ subscriptionID: user?.subscriptionID }),
                }
            );

            const data = await res.json();

            setSubscriptions(data);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
            toast.error("Failed to load subscriptions");
        }
    };

    const handleCancelSubscription = () => {
        setLoading(true);
        const firebaseUid = localStorage.getItem("uid");
        if (!firebaseUid) {
            toast.error("User ID not found");
            setLoading(false);
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cancel_subscription`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firebaseUid }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Subscription canceled successfully");
                } else {
                    toast.error(data.message || "Failed to cancel subscription");
                }
            })
            .catch((error) => {
                console.error("Error canceling subscription:", error);
                toast.error("Error canceling subscription");
            })
            .finally(() => {
                setLoading(false);
                router.push("/home");
            });
    };

    useEffect(() => {
        const uid = localStorage.getItem("uid");
        fetchSubscriptions();
    }, []);

    return (
        <>
            <div className="flex bg-gray-100">
                <SubscriptionTable subscriptions={subscriptions} loading={loading} onCancel={handleCancelSubscription} />
            </div>
        </>
    )
}