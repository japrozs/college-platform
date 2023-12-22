import { useIsAuth } from "@/utils/use-is-auth";
import React from "react";

export default function Home() {
    useIsAuth();
    return (
        <div>
            <p className="menlo">lumos is currently in development</p>
        </div>
    );
}
