"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ConfirmOptions {
  message: string;
  confirm?: string;
  cancel?: string;
}

interface ConfirmContextType {
  confirm: (options: string | ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const useConfirm = () => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside ConfirmProvider");
  return ctx.confirm;
};

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  const confirm = (opts: string | ConfirmOptions) => {
    const normalized: ConfirmOptions =
      typeof opts === "string"
        ? { message: opts, confirm: "OK", cancel: "Cancel" }
        : {
            message: opts.message,
            confirm: opts.confirm || "OK",
            cancel: opts.cancel || "Cancel",
          };
    setOptions(normalized);
    return new Promise<boolean>((resolve) => setResolvePromise(() => resolve));
  };

  const handleConfirm = (choice: boolean) => {
    if (resolvePromise) resolvePromise(choice);
    setOptions(null);
    setResolvePromise(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {options && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white p-5 rounded-xl shadow-lg w-[90%] max-w-sm text-center border border-gray-200"
            onClick={(e) => e.stopPropagation()} // prevent closing on background click
          >
            <p className="text-gray-700 text-sm leading-relaxed font-medium mb-5">
              {options.message}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleConfirm(false)}
                className="text-sm px-8 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                {options.cancel}
              </button>
              <button
                onClick={() => handleConfirm(true)}
                className="text-sm px-8 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {options.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};
