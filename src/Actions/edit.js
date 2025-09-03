import toast from "react-hot-toast";

export async function handleOnUpdate(user) {
    try {
        const savedState = localStorage.getItem("formStates");
        const senerio = localStorage.getItem("senerio");
        const isEditAndId = localStorage.getItem("isEditAndId");
        const parsed = JSON.parse(savedState);
        const parsedSenerio = JSON.parse(senerio);
        const data = {
            transactionId: isEditAndId,
            userId: user._id,
            transactionType: parsedSenerio, 
            formData: parsed
        }

        // Show loading toast
        const loadingToast = toast.loading('Updating data...');
        
        // Make the API call
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error('Update failed');
        }
        
        // Clear local storage
        localStorage.removeItem("formStates");
        localStorage.removeItem("senerio");
        localStorage.removeItem("isEditAndId");

        // Update toast to success
        toast.success('Data updated successfully!', {
            id: loadingToast,
            duration: 1500,
            icon: '✅',
        });

        // Wait for 1.5 seconds before reloading
        setTimeout(() => {
            window.location.reload();
        }, 1500);

    } catch (e) {
        console.error("Error in saving data: ", e);
        
        // Show error toast
        toast.error("Failed to update data. Please try again.", {
            duration: 3000,
        });
    }
}