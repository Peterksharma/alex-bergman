"use client";

/**
 * ConfirmSubmit — a submit button that asks before sending its form.
 * Used for destructive actions (delete photo / delete project). Plain
 * window.confirm keeps it dependency-free and keyboard-accessible.
 */
export default function ConfirmSubmit({ message, className, children, ...props }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      {...props}
    >
      {children}
    </button>
  );
}
