import React, { useEffect, useRef, useCallback, Fragment, useState } from "react";
import { createPortal } from "react-dom";

// ---------------------------------------------------------
// Reusable Tailwind Dialog
// ---------------------------------------------------------
// Features
// - Fully Tailwind CSS (no extra libs)
// - Accessible: role="dialog", aria-modal, labelledby/describedby
// - Closes on ESC and backdrop click (configurable)
// - Simple focus management (focuses first button on open)
// - Smooth enter/leave animations
// - Variants ("default", "danger", "success", "info")
// - Size options ("sm","md","lg")
// - Slot for custom actions (primary/secondary buttons)
// ---------------------------------------------------------

export type DialogAction = {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "ghost";
    autoFocus?: boolean;
};

export type DialogProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    /** Custom content instead of description */
    children?: React.ReactNode;
    /** Clicking backdrop closes */
    closeOnBackdrop?: boolean;
    /** Hitting Escape closes */
    closeOnEsc?: boolean;
    /** Size */
    size?: "sm" | "md" | "lg";
    /** Visual intent */
    intent?: "default" | "danger" | "success" | "info";
    /** Buttons to render on the right */
    actions?: DialogAction[];
    /** Optional Cancel button text (renders before actions) */
    cancelText?: string;
};

const intentHeaderClasses: Record<NonNullable<DialogProps["intent"]>, string> = {
    default: "text-gray-900",
    info: "text-blue-600",
    success: "text-emerald-600",
    danger: "text-red-600",
};

const actionVariant: Record<NonNullable<DialogAction["variant"]>, string> = {
    primary:
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-black/5 bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900",
    secondary:
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400",
    ghost:
        "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300",
};

function useEscape(onClose: () => void, enabled = true) {
    useEffect(() => {
        if (!enabled) return;
        function handler(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose, enabled]);
}

function Portal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return createPortal(children, document.body);
}

export function Dialog({
    open,
    onClose,
    title = "",
    description,
    children,
    closeOnBackdrop = true,
    closeOnEsc = true,
    size = "md",
    intent = "default",
    actions = [],
    cancelText,
}: DialogProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    useEscape(onClose, open && closeOnEsc);

    // Basic scroll lock
    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    // Focus first autofocus action
    useEffect(() => {
        if (!open) return;
        const el = panelRef.current?.querySelector<HTMLButtonElement>("button[autofocus]");
        el?.focus();
    }, [open]);

    const onBackdrop = useCallback(() => {
        if (closeOnBackdrop) onClose();
    }, [closeOnBackdrop, onClose]);

    const sizes = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
    } as const;

    return (
        <Portal>
            {/* Overlay */}
            <div
                aria-hidden={!open}
                className={`fixed inset-0 z-[1000] ${open ? "pointer-events-auto" : "pointer-events-none"
                    }`}
            >
                <div
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={onBackdrop}
                />

                {/* Panel */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? "dialog-title" : undefined}
                        aria-describedby={
                            description || children ? "dialog-description" : undefined
                        }
                        className={`w-full ${sizes[size]} rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-200 origin-center ${open
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-4 scale-95"
                            }`}
                    >
                        {/* Header */}
                        {(title || description) && (
                            <div className="px-5 pt-5">
                                {title && (
                                    <h3
                                        id="dialog-title"
                                        className={`text-lg font-semibold tracking-tight ${intentHeaderClasses[intent]}`}
                                    >
                                        {title}
                                    </h3>
                                )}
                                {(description || children) && (
                                    <div id="dialog-description" className="mt-2 text-sm text-gray-600">
                                        {description ? <p>{description}</p> : children}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-2 px-5 py-4">
                            {cancelText && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className={actionVariant.secondary}
                                >
                                    {cancelText}
                                </button>
                            )}
                            {actions.map((a, i) => (
                                <button
                                    key={i}
                                    type={a.type ?? "button"}
                                    onClick={a.onClick}
                                    className={actionVariant[a.variant ?? "primary"]}
                                    autoFocus={a.autoFocus}
                                >
                                    {a.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}

// ---------------------------------------------------------
// Demo usage — You can remove this and import <Dialog />
// ---------------------------------------------------------
export default function Demo() {
    const [open, setOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 p-8">
            <div className="mx-auto max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">Reusable Tailwind Dialog</h1>
                <p className="text-gray-600 mb-6">
                    Click the button below to open the dialog. This component is flexible
                    and can be used across your app.
                </p>
                <button
                    onClick={() => setOpen(true)}
                    className="rounded-2xl bg-gray-900 text-white px-5 py-2.5 text-sm font-medium shadow-sm ring-1 ring-black/5 hover:bg-gray-800"
                >
                    Open Dialog
                </button>
            </div>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                title="Select Any Options"
                description="Please select at least one option before saving."
                intent="danger"
                cancelText="Cancel"
                actions={[
                    {
                        label: "Continue",
                        onClick: () => setOpen(false),
                        variant: "primary",
                        autoFocus: true,
                    },
                ]}
            />
        </div>
    );
}
