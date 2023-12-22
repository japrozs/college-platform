import { CollegeListItem } from "@/types";

export const getPillBorderColor = (item: CollegeListItem): string => {
    const rate = item.content.facts[0].value * 100;
    if (0 <= rate && rate < 20) {
        return "border-green-300";
    } else if (20 <= rate && rate <= 50) {
        return "border-yellow-300";
    } else {
        return "border-red-300";
    }
};

export const getPillTextColor = (item: CollegeListItem): string => {
    const rate = item.content.facts[0].value * 100;
    if (0 <= rate && rate < 20) {
        return "text-green-300";
    } else if (20 <= rate && rate <= 50) {
        return "text-yellow-300";
    } else {
        return "text-red-300";
    }
};

export const getPillBgColor = (item: CollegeListItem): string => {
    const rate = item.content.facts[0].value * 100;
    if (0 <= rate && rate < 20) {
        return "bg-green-900 bg-opacity-60";
    } else if (20 <= rate && rate <= 50) {
        return "bg-yellow-900 bg-opacity-60";
    } else {
        return "bg-red-900 bg-opacity-60";
    }
};
