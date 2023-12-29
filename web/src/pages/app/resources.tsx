import { Wrapper } from "@/components/shared/wrapper";
import { ResourceCard } from "@/components/ui/resource-card";
import { RESOURCES } from "@/constants";
import { ResourceType } from "@/types";
import { useIsAuth } from "@/utils/use-is-auth";
import React from "react";

export default function Resources({}) {
    useIsAuth();
    return (
        <div>
            <Wrapper>
                <div className="px-10 py-5">
                    <p className="text-3xl global_title mb-10">
                        <span className="mr-3">🔨</span>Resources
                    </p>
                    {RESOURCES.map((resource: ResourceType, idx: number) => (
                        <ResourceCard key={idx} resource={resource} />
                    ))}
                </div>
            </Wrapper>
        </div>
    );
}
