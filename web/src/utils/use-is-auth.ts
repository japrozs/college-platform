import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { Exact, MeQuery, Query, useMeQuery } from "../generated/graphql";
import { QueryResult } from "@apollo/client";

// TODO: fix this, this is most probably wrong
export const useIsAuth = (): ReturnType<typeof useMeQuery> => {
    const { data, loading, ...rest } = useMeQuery();
    const router: NextRouter = useRouter();
    useEffect(() => {
        if (["/login", "/signup", "/"].includes(router.pathname)) {
            if (!loading && data?.me != null) {
                router.push("/app");
            }
            return;
        }
    }, [loading, data, router]);
    return { data, loading, ...rest };
};
