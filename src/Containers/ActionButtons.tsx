'use client';

type FormActionsProps = {
    loading?: boolean
    onSave?: () => void;
    onPrint?: () => void;
    onInvoice?: () => void;
    onClear?: () => void;
    isEdit?: string;
};

const FormActions = ({
    loading,
    onSave,
    onPrint,
    onInvoice,
    onClear,
    isEdit
}: FormActionsProps) => {
    return (
        <div className="flex flex-wrap gap-4 justify-start">
            <div
                className={`flex flex-wrap gap-4 justify-start ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
            >
                <button
                    disabled={loading}
                    className="border border-black text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
                    onClick={onSave}
                >
                    {isEdit ? "Update" : "Save"}
                </button>
                <button
                    disabled={loading}
                    className="border border-black text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
                    onClick={onPrint}
                >
                    Print
                </button>
                <button
                    disabled={loading}
                    className="border border-black text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
                    onClick={onInvoice}
                >
                    Generate Invoice
                </button>
                <button
                    disabled={loading}
                    className="border border-black text-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
                    onClick={onClear}
                >
                    {isEdit ? "Cancel Editing" : "Clear Form"}
                </button>
            </div>
        </div>
    );
};

export default FormActions;
