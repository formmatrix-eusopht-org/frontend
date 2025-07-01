
export async function handleOnSave(user) {
    try {
        const savedState = localStorage.getItem("formStates");
        const senerio = localStorage.getItem("senerio");
        const parsed = JSON.parse(savedState);
        const parsedSenerio = JSON.parse(senerio);
        const data = {
            userId: user.uid,
            transactionType: parsedSenerio[0],
            formData: parsed
        }
        await fetch('http://localhost:3001/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        localStorage.removeItem("formStates")
        alert("Data saved Successfully")
    } catch (e) {
        console.error("Error in saving data : ", e)
    }
}