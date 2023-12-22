import React from "react";

interface WelcomeProps {}

export const Welcome: React.FC<WelcomeProps> = ({}) => {
    return (
        <div className="p-10">
            <p className="menlo text-green-500">Welcome page</p>
        </div>
    );
};
