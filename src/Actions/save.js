import toast from "react-hot-toast";

export async function handleOnSave(user) {
    try {
        const loadingToast = toast.loading("Saving data...");

        const senerio = localStorage.getItem("senerio");
        const parsedSenerio = senerio ? JSON.parse(senerio) : [];

        const storageKey = parsedSenerio?.includes("Multiple Transfer")
            ? "multipleTransferStates"
            : "formStates";

        const savedState = localStorage.getItem(storageKey);
        const parsed = savedState ? JSON.parse(savedState) : [];

        const data = {
            userId: user?._id,
            transactionType: parsedSenerio,
            formData: parsed,
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error("Save failed");
        }



        toast.success("Data saved successfully!", {
            id: loadingToast,
            duration: 1500,
            icon: "✅",
        });

    } catch (e) {
        console.error("Error in saving data:", e);

        toast.error("Failed to save data. Please try again.", {
            duration: 3000,
        });
    }
}