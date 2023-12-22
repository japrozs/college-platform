import { Wrapper } from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import { MAIN_COLLEGE_LIST } from "@/data/colleges";
import { CollegeListItem } from "@/types";
import { useIsAuth } from "@/utils/use-is-auth";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { Pill } from "@/components/ui/pill";
import {
    getPillBgColor,
    getPillBorderColor,
    getPillTextColor,
} from "@/utils/pill";
import { toTitleCase } from "@/utils/utils";
import { AddCollegeModal } from "@/components/modals/add-college";

export default function CollegeList() {
    useIsAuth();
    const [list, setList] = useState<CollegeListItem[]>(
        MAIN_COLLEGE_LIST.slice(0, 5)
    );
    const [open, setOpen] = useState(false);

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setList(items);
    };
    return (
        <div>
            <Wrapper>
                <div>
                    <div className="px-10 py-5  flex items-center mb-3">
                        <p className="text-3xl global_title">
                            <span className="mr-3">🏫</span>Your College List
                        </p>
                        <div className="ml-auto w-40">
                            <Button
                                onClick={() => setOpen(true)}
                                icon={GoPlus}
                                label="Add college"
                                colored
                            />
                        </div>
                    </div>
                    <div className="px-3">
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="list">
                                {(provided) => (
                                    <ul
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {list.map(
                                            (item: CollegeListItem, index) => {
                                                return (
                                                    <Draggable
                                                        key={item.guid}
                                                        draggableId={item.guid}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                className={
                                                                    "px-3 py-3 flex items-center group"
                                                                }
                                                            >
                                                                <p
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <RxDragHandleDots2 className="hover:bg-gray-900 rounded transition-opacity opacity-0 group-hover:opacity-100 text-gray-600 text-2xl mr-5" />
                                                                </p>
                                                                <p className="font-medium text-gray-200 mr-3">
                                                                    {
                                                                        item
                                                                            .content
                                                                            .entity
                                                                            .name
                                                                    }
                                                                    <span className="ml-3 text-gray-700 text-sm menlo ">
                                                                        –{" "}
                                                                        {
                                                                            item
                                                                                .content
                                                                                .entity
                                                                                .location
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <div
                                                                    className={
                                                                        "hidden lg:block ml-auto lg:flex items-center"
                                                                    }
                                                                >
                                                                    <Pill
                                                                        borderColor={
                                                                            "border-purple-300"
                                                                        }
                                                                        textColor={
                                                                            "text-purple-300"
                                                                        }
                                                                        bgColor={
                                                                            "bg-purple-900 bg-opacity-60"
                                                                        }
                                                                        label={`SAT Range ${item.content.facts[2].value}`}
                                                                    />
                                                                    <Pill
                                                                        borderColor={
                                                                            "border-blue-300"
                                                                        }
                                                                        textColor={
                                                                            "text-blue-300"
                                                                        }
                                                                        bgColor={
                                                                            "bg-blue-900 bg-opacity-60"
                                                                        }
                                                                        label={`$ ${item.content.facts[1].value.toLocaleString()}`}
                                                                    />
                                                                    <Pill
                                                                        borderColor={getPillBorderColor(
                                                                            item
                                                                        )}
                                                                        textColor={getPillTextColor(
                                                                            item
                                                                        )}
                                                                        bgColor={getPillBgColor(
                                                                            item
                                                                        )}
                                                                        label={`Acceptance rate – ${(
                                                                            item
                                                                                .content
                                                                                .facts[0]
                                                                                .value *
                                                                            100
                                                                        )
                                                                            .toFixed(
                                                                                1
                                                                            )
                                                                            .toString()} %`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            }
                                        )}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
            </Wrapper>
            <AddCollegeModal
                open={open}
                setOpen={setOpen}
                list={list}
                setList={setList}
            />
        </div>
    );
}
