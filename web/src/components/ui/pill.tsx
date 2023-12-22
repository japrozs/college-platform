import React from "react";

interface PillProps {
    label: string;
    borderColor?: string;
    textColor?: string;
    bgColor?: string;
}

export const Pill: React.FC<PillProps> = ({
    label,
    borderColor,
    textColor,
    bgColor,
}) => {
    return (
        <div
            className={`border ${
                borderColor ? borderColor : "border-gray-800"
            } ${bgColor && bgColor} ml-4 px-2 py-1 rounded-full`}
        >
            <p
                className={`text-xs font-semibold ${
                    textColor ? textColor : "text-gray-500"
                }`}
            >
                {label}
            </p>
        </div>
    );
};
