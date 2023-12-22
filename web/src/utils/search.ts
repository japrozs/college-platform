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
