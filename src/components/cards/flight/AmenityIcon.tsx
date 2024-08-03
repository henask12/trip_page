import React from "react";
import {
  WifiIcon,
  BoltIcon,
  GlobeAltIcon,
  FilmIcon,
} from "@heroicons/react/24/outline";
type AmenityType = "wifi" | "usb" | "meals" | "entertainment";

const AmenityIcon: React.FC<{ type: AmenityType; visible: boolean }> = ({
  type,
  visible,
}) => {
  const icons: Record<AmenityType, React.JSX.Element> = {
    wifi: <WifiIcon className="h-4 w-4 text-teal-500" />,
    usb: <BoltIcon className="h-4 w-4 text-teal-500" />,
    meals: <GlobeAltIcon className="h-4 w-4 text-teal-500" />,
    entertainment: <FilmIcon className="h-4 w-4 text-teal-500" />,
  };

  return (
    <div className="relative flex items-center space-x-1">
      {visible && icons[type]}
    </div>
  );
};

export default AmenityIcon;
