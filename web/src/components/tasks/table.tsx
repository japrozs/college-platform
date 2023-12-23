import { Column } from "@/types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import { BiDetail, BiPlus } from "react-icons/bi";
import { v4 } from "uuid";
import { PiPencil } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { formatText } from "@/utils/utils";
import { EditColumn } from "../modals/edit-column";
import { useUpdateTasksMutation } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { matchFilter } from "../../utils/search";

interface TableProps {
    columnId: string;
    column: Column;
    setBoard: React.Dispatch<any>;
    board: any;
    filter: string;
}

export const Table: React.FC<TableProps> = ({
    column,
    columnId,
    setBoard,
    board,
    filter,
}) => {
    const [creatingNewNote, setCreatingNewNote] = useState(false);
    const [note, setNote] = useState("");
    const [open, setOpen] = useState(false);
    const [updateTasksMutation] = useUpdateTasksMutation();
    const client = useApolloClient();
    console.log(column);
    console.log("columnId ::", columnId);

    useEffect(() => {
        console.log(`something changed with column ${column.name}`);
        console.log(column);
        board[columnId] = column;
        console.log(board);
        setBoard(board);
        (async () => {
            await updateTasksMutation({
                variables: {
                    tasks: JSON.stringify(board),
                },
            });
            // await client.resetStore();
        })();
    }, [column.items]);

    return (
        <div className="flex flex-col" key={columnId}>
            <div className="mx-3">
                <div
                    className="flex items-center p-5 pb-2  rounded-tr-md rounded-tl-sm px-3 border-t border-l border-r border-gray-800"
                    style={{
                        backgroundColor: "#010409",
                    }}
                >
                    <p
                        className="font-medium"
                        style={{
                            color: "#C9D1D9",
                        }}
                    >
                        {column.name}
                    </p>
                    <div className="flex items-center ml-auto mr-1">
                        <PiPencil
                            onClick={() => setOpen(true)}
                            className="text-lg cursor-pointer mx-1.5 text-gray-400 hover:text-purple-500"
                        />
                        <BiPlus
                            onClick={() => setCreatingNewNote(true)}
                            className="text-xl cursor-pointer mx-1.5 text-gray-400 hover:text-blue-500"
                        />
                        <RiDeleteBin6Line
                            onClick={() => {
                                const boardCopy = structuredClone(board);
                                delete boardCopy[columnId];
                                console.log(
                                    "board with table deleted ::",
                                    boardCopy
                                );
                                setBoard(boardCopy);
                            }}
                            className="text-lg cursor-pointer mx-1.5 text-gray-400 hover:text-red-500"
                        />
                        {/* <BoardMenu
                            column={column}
                            columnId={columnId}
                            setBoard={setBoard}
                            setOpen={setOpen}
                        /> */}
                    </div>
                </div>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="p-2 rounded-bl-sm rounded-br-md px-3 border-l border-r border-b border-gray-800"
                                style={{
                                    width: "310px",
                                    minHeight: 500,
                                    backgroundColor: "#010409",
                                }}
                            >
                                <>
                                    {creatingNewNote && (
                                        <div className="mb-3">
                                            <textarea
                                                value={note}
                                                onChange={(e) =>
                                                    setNote(e.target.value)
                                                }
                                                placeholder="Enter a task"
                                                className="w-full p-2 border border-gray-700 rounded-md focus:border-blue-500 focus:ring focus:outline-none text-sm text-white h-max"
                                                style={{
                                                    backgroundColor: "#0D1117",
                                                }}
                                            />
                                            <div className="flex items-center space-x-2">
                                                <div className="w-1/2">
                                                    <Button
                                                        label="Add"
                                                        disabled={
                                                            note.trim()
                                                                .length == 0
                                                        }
                                                        onClick={() => {
                                                            column.items = [
                                                                {
                                                                    id: v4(),
                                                                    content:
                                                                        note,
                                                                },
                                                                ...column.items,
                                                            ];
                                                            setNote("");
                                                            setCreatingNewNote(
                                                                false
                                                            );
                                                        }}
                                                        colored
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <Button
                                                        label="Cancel"
                                                        onClick={() =>
                                                            setCreatingNewNote(
                                                                false
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {column.items.map((item, index) => {
                                        return (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => {
                                                    return (
                                                        <>
                                                            {matchFilter(
                                                                filter,
                                                                item.content
                                                            ) ? (
                                                                <div
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`flex group align-top move p-2 mb-2 text-gray-200 relative rounded-sm ${
                                                                        snapshot.isDragging
                                                                            ? "ring"
                                                                            : ""
                                                                    }`}
                                                                    style={{
                                                                        backgroundColor:
                                                                            "#161B22",
                                                                        border: "1px solid #262C33",
                                                                        ...provided
                                                                            .draggableProps
                                                                            .style,
                                                                    }}
                                                                >
                                                                    <div className="hidden group-hover:block bg-gray-900 rounded p-1.5 group-hover:flex items-center border border-gray-700 absolute top-1 right-1 z-30">
                                                                        <PiPencil
                                                                            onClick={() => {
                                                                                setNote(
                                                                                    item.content
                                                                                );
                                                                                setCreatingNewNote(
                                                                                    true
                                                                                );
                                                                                // discretely delete the old note
                                                                                const boardCopy: any =
                                                                                    structuredClone(
                                                                                        board
                                                                                    );
                                                                                boardCopy[
                                                                                    columnId
                                                                                ].items.splice(
                                                                                    index,
                                                                                    1
                                                                                );
                                                                                setBoard(
                                                                                    boardCopy
                                                                                );
                                                                            }}
                                                                            className="text-base mr-2 cursor-pointer text-gray-400 hover:text-purple-500"
                                                                        />

                                                                        <RiDeleteBin6Line
                                                                            onClick={() => {
                                                                                console.log(
                                                                                    "--- delete note output ---"
                                                                                );
                                                                                console.log(
                                                                                    board
                                                                                );
                                                                                const boardCopy: any =
                                                                                    structuredClone(
                                                                                        board
                                                                                    );
                                                                                boardCopy[
                                                                                    columnId
                                                                                ].items.splice(
                                                                                    index,
                                                                                    1
                                                                                );
                                                                                setBoard(
                                                                                    boardCopy
                                                                                );
                                                                                console.log(
                                                                                    "--- END delete note output ---"
                                                                                );
                                                                            }}
                                                                            className="text-base cursor-pointer text-gray-400 hover:text-red-500"
                                                                        />
                                                                    </div>
                                                                    <p
                                                                        className="w-full text-sm font-medium"
                                                                        style={{
                                                                            color: "#C1C9D1",
                                                                            overflowWrap:
                                                                                "break-word",
                                                                        }}
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: formatText(
                                                                                item.content
                                                                            ),
                                                                        }}
                                                                    ></p>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="hidden"
                                                                ></div>
                                                            )}
                                                        </>
                                                    );
                                                }}
                                            </Draggable>
                                        );
                                    })}
                                </>
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
            <EditColumn
                setOpen={setOpen}
                open={open}
                id={columnId}
                column={column}
                board={board}
                setBoard={setBoard}
            />
        </div>
    );
};
