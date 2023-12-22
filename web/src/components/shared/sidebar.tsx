import React from "react";
import Image from "next/image";
import { SidebarItem } from "./sidebar-item";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { GrResources } from "react-icons/gr";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
    return (
        <aside className="flex flex-col h-screen border-r w-64 bg-black-700 border-gray-800">
            <div className="px-6 py-5 z-10 border-b border-gray-800">
                <Image
                    src="/logo.svg"
                    className="h-8 w-auto"
                    height={20}
                    width={20}
                    alt="logo"
                />
            </div>
            <SidebarItem
                link={"/app/essays"}
                label="Essays"
                icon={HiOutlineDocumentText}
            />
            <SidebarItem link={"/app/tasks"} label="Tasks" icon={FaTasks} />
            <SidebarItem
                link={"/app/college-list"}
                label="College list"
                icon={MdOutlineFormatListNumbered}
            />
            <SidebarItem
                link={"/app/resources"}
                label="Resources"
                icon={GrResources}
            />
            <div className="h-full"></div>
            <div>
                <SidebarItem
                    link={"/app/settings"}
                    label="Settings"
                    icon={IoMdSettings}
                />
            </div>
        </aside>
    );
};

export default Sidebar;
