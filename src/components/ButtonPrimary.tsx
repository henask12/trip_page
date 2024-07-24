import React from "react";
import Button, { ButtonProps } from "./Button";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  withSearchIcon = true,
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-10 hover:bg-primary-100 text-neutral-50 ${className}`}
      withSearchIcon={withSearchIcon}
      {...args}
      heightClass="h-16 m-2"
    />
  );
};

export default ButtonPrimary;
