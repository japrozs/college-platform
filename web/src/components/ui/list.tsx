import { MeQuery, useUpdateCollegeListMutation } from "@/generated/graphql";
import { CollegeListItem } from "@/types";
import {
    getPillBorderColor,
    getPillTextColor,
    getPillBgColor,
} from "@/utils/pill";
import { useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GoPlus } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "./button";
import { Pill } from "./pill";
import { RxDragHandleDots2 } from "react-icons/rx";
import { AddCollegeModal } from "../modals/add-college";

interface ListProps {
    data: MeQuery;
}

export const List: React.FC<ListProps> = ({ data }) => {
    const [updateCollegeListMutation, { loading }] =
        useUpdateCollegeListMutation();
    const client = useApolloClient();
    const [list, setList] = useState<CollegeListItem[]>(
        (
            JSON.parse(data?.me?.collegeList || '{"list" : []}') as {
                list: CollegeListItem[];
            }
        ).list
    );
    console.log(list);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("start saving...");
        const timeout = setTimeout(async () => {
            await updateCollegeListMutation({
                variables: {
                    collegeList: JSON.stringify({ list }),
                },
            });
            await client.resetStore();
        }, 500);

        console.log("end saving...");
        return () => clearTimeout(timeout);
    }, [list]);

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setList(items);
    };
    return (
        <div>
            <div>
                <div className="px-10 py-5  flex items-center mb-3">
                    <p className="text-3xl global_title">
                        <span className="mr-3">🏫</span>Your College List
                    </p>
                    <div className="ml-auto flex items-center">
                        {loading ? (
                            <p className="min-w-32 hidden md:block mx-5 text-sm font-medium text-gray-400">
                                Saving...
                            </p>
                        ) : (
                            <div className="flex items-center mx-5 min-w-32 ">
                                <IoMdCheckmark
                                    className={"mr-2 text-green-500"}
                                />
                                <p className="hidden md:block  font-medium text-gray-400">
                                    Saved
                                </p>
                            </div>
                        )}
                        <div className="ml-5 w-40">
                            <Button
                                onClick={() => setOpen(true)}
                                icon={GoPlus}
                                label="Add college"
                                colored
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-3">
                {list.length === 0 ? (
                    <>
                        <p>add college</p>
                    </>
                ) : (
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
                                                                    item.content
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
                                                                <RiDeleteBin6Line
                                                                    className={
                                                                        "text-xl hover:text-red-500 text-gray-500 ml-5 cursor-pointer"
                                                                    }
                                                                    onClick={() => {
                                                                        const listCopy =
                                                                            [
                                                                                ...list,
                                                                            ];
                                                                        listCopy.splice(
                                                                            index,
                                                                            1
                                                                        );
                                                                        setList(
                                                                            listCopy
                                                                        );
                                                                    }}
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
                )}
            </div>
            <AddCollegeModal
                open={open}
                setOpen={setOpen}
                list={list}
                setList={setList}
            />
        </div>
    );
};
