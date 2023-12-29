import { Wrapper } from "@/components/shared/wrapper";
import { FINANCIAL_AID_RESOURCES } from "@/constants";
import { ResourceLinkType } from "@/types";
import { useIsAuth } from "@/utils/use-is-auth";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function FinancialAid() {
    useIsAuth();
    const [query, setQuery] = useState("");
    return (
        <div>
            <Wrapper>
                <div className="px-10 py-5">
                    <div className="flex items-center mb-3">
                        <p className="text-3xl global_title">
                            <span className="mr-3">💵</span>
                            {FINANCIAL_AID_RESOURCES.name} Resources
                        </p>
                        <div
                            className="ml-auto self-center flex items-center max-w-md w-full rounded-md py-2 px-2 border border-gray-700 focus-within:outline-none focus-within:border-blue-500 focus-within:ring text-gray-200 text-sm"
                            style={{
                                backgroundColor: "#010409",
                            }}
                        >
                            <BiSearch className="text-gray-500 text-xl" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Filter list"
                                className="bg-transparent w-full focus:outline-none ml-1.5"
                            />
                        </div>
                    </div>
                    <p className="text-gray-600 mb-10">
                        {FINANCIAL_AID_RESOURCES.description}
                    </p>
                    {FINANCIAL_AID_RESOURCES.links.map(
                        (link: ResourceLinkType) => (
                            <a href={link.url}>
                                <div className="p-3 group cursor-pointer border-b border-gray-900 flex items-center rounded hover:bg-dark-compliment-hovered">
                                    {/* <resource.icon
								className={`w-6 h-auto ${resource.color} mr-3`}
							/> */}
                                    <p className="min-w-fit text-primary-color group-hover:underline font-medium">
                                        {link.title}
                                    </p>
                                    <p className="truncate ml-2 menlo line-clamp-1 text-gray-600">
                                        – {link.url}
                                    </p>
                                </div>
                            </a>
                        )
                    )}
                </div>
            </Wrapper>
        </div>
    );
}
