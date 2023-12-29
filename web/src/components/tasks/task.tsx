import React, { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { Button } from "../ui/button";
import { GoPlus } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { v4 } from "uuid";
import { DragDropContext } from "@hello-pangea/dnd";
import { Table } from "./table";
import { MeQuery, useUpdateTasksMutation } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";

interface TaskProps {
    data: MeQuery;
}

export const Task: React.FC<TaskProps> = ({ data }) => {
    const [query, setQuery] = useState("");
    const [board, setBoard] = useState(JSON.parse(data.me?.tasks || "{}"));
    const [updateTasksMutation, { loading }] = useUpdateTasksMutation();
    const client = useApolloClient();

    const onDragEnd = (result: any, columns: any, setColumns: any) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setBoard({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setBoard({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    useEffect(() => {
        console.log("start saving...");
        console.log(board);
        const timeout = setTimeout(async () => {
            await updateTasksMutation({
                variables: {
                    tasks: JSON.stringify(board),
                },
            });
            await client.resetStore();
        }, 500);

        console.log("end saving...");
        return () => clearTimeout(timeout);
    }, [board]);

    return (
        <div>
            <div className="px-10 py-5 ">
                <div className="flex items-center mb-10">
                    <p className="text-3xl global_title">
                        <span className="mr-3">🎯</span>Tasks
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
                    </div>
                    <div className="mr-2.5 w-32">
                        <Button
                            onClick={() => {
                                setBoard({
                                    ...board,
                                    [v4()]: {
                                        name: "New Column",
                                        items: [],
                                    },
                                });
                            }}
                            icon={GoPlus}
                            label="New table"
                            colored
                        />
                    </div>
                    <div
                        className="self-center flex items-center max-w-md w-full rounded-md py-2 px-2 border border-gray-700 focus-within:outline-none focus-within:border-blue-500 focus-within:ring text-gray-200 text-sm"
                        style={{
                            backgroundColor: "#010409",
                        }}
                    >
                        <BiSearch className="text-gray-500 text-xl" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Filter cards"
                            className="bg-transparent w-full focus:outline-none ml-1.5"
                        />
                    </div>
                </div>
                {data.me?.tasks === "{}" ? (
                    <>
                        <p>
                            click on the new table button to get started with
                            tasks
                        </p>
                    </>
                ) : (
                    <>
                        <div className="flex h-full mt-3 overflow-x-scroll no-scrollbar">
                            <DragDropContext
                                onDragEnd={(result) =>
                                    onDragEnd(result, board, setBoard)
                                }
                            >
                                {Object.entries(board).map(
                                    ([columnId, column], index) => (
                                        <Table
                                            key={columnId}
                                            columnId={columnId}
                                            column={column as any}
                                            setBoard={setBoard}
                                            board={board}
                                            filter={query}
                                        />
                                    )
                                )}
                            </DragDropContext>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
