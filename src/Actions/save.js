import toast from "react-hot-toast";

export async function handleOnSave(user) {
    try {
        const loadingToast = toast.loading('Saving data...');
        const senerio = localStorage.getItem("senerio");
        const parsedSenerio = JSON.parse(senerio);
        const savedState = localStorage.getItem(parsedSenerio?.includes("Multiple Transfer") ? "multipleTransferStates" : "formStates");
        const parsed = JSON.parse(savedState);
        const data = {
            userId: user._id,
            transactionType: parsedSenerio,
            formData: parsed
        }
        // console.log(data);

        // Show loading toast

        // Make the API call
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Save failed');
        }

        // Clear local storage
        localStorage.removeItem("formStates");
        localStorage.removeItem("senerio");

        // Update toast to success
        toast.success('Data saved successfully!', {
            id: loadingToast,
            duration: 1500,
            icon: '✅',
        });

        // Optional: Wait before performing any additional actions
        setTimeout(() => {
            window.location.reload();
        }, 1500);

    } catch (e) {
        console.error("Error in saving data: ", e);

        // Show error toast
        toast.error("Failed to save data. Please try again.", {
            duration: 3000,
        });
    }
}