import { ResourceType } from "@/types";
import React from "react";
import { IconType } from "react-icons/lib";

interface ResourceCardProps {
    resource: ResourceType;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
    return (
        <a href={`/app/resources/${resource.slug}`}>
            <div className="p-3 group cursor-pointer border-b border-gray-900 flex items-center rounded hover:bg-dark-compliment-hovered">
                <resource.icon
                    className={`w-6 h-auto ${resource.color} mr-3`}
                />
                <p className="min-w-fit text-primary-color group-hover:underline font-medium">
                    {resource.name}
                </p>
                <p className="truncate ml-2 line-clamp-1 text-gray-600">
                    – {resource.description}
                </p>
            </div>
        </a>
    );
};
