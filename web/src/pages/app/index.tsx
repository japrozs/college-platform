import { Wrapper } from "@/components/shared/wrapper";
import { Welcome } from "@/components/ui/welcome";
import { useIsAuth } from "@/utils/use-is-auth";
import React from "react";

export default function MainApp() {
    useIsAuth();
    return (
        <div>
            <Wrapper>
                <Welcome />
            </Wrapper>
        </div>
    );
}
