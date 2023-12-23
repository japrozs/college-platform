import { CollegeListItem } from "@/types";
import { MAIN_COLLEGE_LIST } from "../data/colleges";

export const search = (
    query: string,
    list: CollegeListItem[]
): CollegeListItem[] => {
    const results = MAIN_COLLEGE_LIST.filter((college) => {
        return (
            college.content.entity.name
                .trim()
                .replaceAll("-", "")
                .replaceAll(".", "")
                .split(" ")
                .join("")
                .toLowerCase()
                .includes(
                    query
                        .trim()
                        .replaceAll("-", "")
                        .replaceAll(".", "")
                        .split(" ")
                        .join("")
                        .toLowerCase()
                ) && !list.includes(college)
        );
    }).slice(0, 5);
    return results;
};

// used in web/src/components/tasks/table.tsx for rendering kanban board cards
export const matchFilter = (filter: string, text: string) => {
    if (filter.trim().length == 0) {
        return true;
    }

    if (
        text
            .trim()
            .split(" ")
            .join("")
            .toLowerCase()
            .includes(filter.trim().split(" ").join("").toLowerCase())
    ) {
        return true;
    }
    return false;
};
