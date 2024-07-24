import { Route } from "@/routers/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { ButtonHTMLAttributes, FC } from "react";

export interface ButtonProps {
  className?: string;
  translate?: string;
  sizeClass?: string;
  fontSize?: string;
  heightClass?: string;  // New prop
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  href?: Route<string>;
  targetBlank?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  withSearchIcon?: boolean;
}

const Button: FC<ButtonProps> = ({
  className = "text-neutral-700 dark:text-neutral-200",
  translate = "",
  sizeClass = "px-4 py-3 sm:px-6",
  fontSize = "text-sm sm:text-base font-medium",
  heightClass = "h-auto",  // Default height
  disabled = false,
  href,
  children,
  targetBlank,
  type,
  loading,
  onClick = () => {},
  withSearchIcon = false,
}) => {
  const CLASSES = `nc-Button relative inline-flex items-center justify-center rounded-md transition-colors ${fontSize} ${sizeClass} ${heightClass} ${translate} ${className}`;

  const _renderLoading = () => {
    return (
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  };

  const _renderContent = () => (
    <>
      {withSearchIcon && <MagnifyingGlassIcon className="h-5 w-5 mr-2" />} {/* Render the search icon if withSearchIcon is true */}
      {children || `This is Button`}
    </>
  );

  if (!!href) {
    return (
      <Link
        href={href}
        target={targetBlank ? "_blank" : undefined}
        className={`${CLASSES} `}
        onClick={onClick}
        rel={targetBlank ? "noopener noreferrer" : undefined}
      >
        {_renderContent()}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${CLASSES}`}
      onClick={onClick}
      type={type}
    >
      {loading && _renderLoading()}
      {!loading && _renderContent()} {/* Only render content when not loading */}
    </button>
  );
};

export default Button;