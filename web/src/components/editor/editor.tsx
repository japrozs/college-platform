import { Button } from "@/components/ui/button";
import {
    GetEssayQuery,
    useDeleteEssayMutation,
    useUpdateEssayMutation,
} from "@/generated/graphql";
import { timeSinceShort } from "@/utils/time-since";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { IoMdCheckmark } from "react-icons/io";

interface EditorProps {
    essay: GetEssayQuery["getEssay"];
}

export const Editor: React.FC<EditorProps> = ({ essay }) => {
    const [title, setTitle] = useState(essay.title);
    const [body, setBody] = useState(essay.body);
    const [updateEssayMutation, { loading }] = useUpdateEssayMutation();
    const [deleteEssayMutation] = useDeleteEssayMutation();
    const bodyElementRef = useRef<HTMLParagraphElement>(null);
    const titleElementRef = useRef<HTMLParagraphElement>(null);
    const client = useApolloClient();
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(async () => {
            console.log("start saving...");
            await updateEssayMutation({
                variables: {
                    id: essay.id,
                    title: title.length === 0 ? "Untitled" : title,
                    body: body,
                },
            });
            await client.resetStore();
        }, 500);

        return () => clearTimeout(timeout);
    }, [title, body]);

    const deleteEssay = async () => {
        await deleteEssayMutation({
            variables: {
                id: essay.id,
            },
        });
        router.push("/app/essays");
        await client.resetStore();
    };

    return (
        <div className="px-10 py-5">
            <div className="flex items-start mb-8">
                <span className="text-3xl mr-3">📓</span>
                <ContentEditable
                    innerRef={titleElementRef}
                    tagName="p"
                    html={title}
                    className="focus:outline-none text-3xl global_title overflow-y-scroll cursor-text"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="ml-auto flex items-center">
                    {loading ? (
                        <p className="min-w-32 hidden md:block mx-5 text-sm font-medium text-gray-400">
                            Saving...
                        </p>
                    ) : (
                        <div className="flex items-center mx-5 min-w-32 ">
                            <IoMdCheckmark className={"mr-2 text-green-500"} />
                            <p className="hidden md:block  font-medium text-gray-400">
                                Saved
                            </p>
                        </div>
                    )}
                    <div className="w-36 pl-0">
                        <Button
                            onClick={deleteEssay}
                            label={"Delete essay"}
                            colored
                            color={"bg-red-500 border-red-700"}
                        />
                    </div>
                </div>
            </div>
            <div className="max-w-5xl w-full bg-dark-compliment-hovered px-8 py-6 rounded mx-auto">
                <ContentEditable
                    innerRef={bodyElementRef}
                    tagName="p"
                    html={body}
                    className="focus:outline-none"
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
        </div>
    );
};
