import { Wrapper } from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import {
    RegularEssayFragment,
    useCreateEssayMutation,
    useMeQuery,
} from "@/generated/graphql";
import { timeSince, timeSinceShort } from "@/utils/time-since";
import { useIsAuth } from "@/utils/use-is-auth";
import { GoPlus } from "react-icons/go";
import { TiDocumentText } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";

export default function Essays() {
    useIsAuth();
    const { data } = useMeQuery();
    const router = useRouter();
    const [createEssaymutation] = useCreateEssayMutation();
    console.log(data?.me?.essays);

    const createEssay = async () => {
        const essay = await createEssaymutation({
            variables: {
                title: "😁 Untitled",
            },
        });
        router.push(`/app/essays/${essay.data?.createEssay.id}`);
    };

    return (
        <div>
            <Wrapper>
                <div className="px-10 py-5">
                    <div className="flex items-center mb-8">
                        <p className="text-3xl global_title">
                            <span className="mr-3">📓</span>Your Essays
                        </p>
                        <div className="ml-auto w-40">
                            <Button
                                onClick={createEssay}
                                icon={GoPlus}
                                label="New essay"
                                colored
                            />
                        </div>
                    </div>
                    <div className="p-3 group border-b border-gray-900 flex items-center rounded">
                        <p className="menlo text-gray-600">NAME</p>
                        <div className="ml-auto flex items-center">
                            <p className="menlo text-gray-600">LAST UPDATED</p>
                            <RiDeleteBin6Line
                                className={"text-xl opacity-0 ml-10"}
                            />
                        </div>
                    </div>
                    {data?.me?.essays.map(
                        (essay: RegularEssayFragment, idx: number) => (
                            <a key={idx} href={`/app/essays/${essay.id}`}>
                                <div className="p-3 group cursor-pointer border-b border-gray-900 flex items-center rounded hover:bg-dark-compliment-hovered">
                                    <TiDocumentText
                                        className={
                                            "text-xl text-gray-500 mr-2.5"
                                        }
                                    />
                                    <p className="text-primary-color group-hover:underline font-medium">
                                        {essay.title}
                                    </p>
                                    <div className="ml-auto flex items-center font-medium text-gray-500">
                                        <p>{timeSince(essay.updatedAt)} ago</p>
                                    </div>
                                    <RiDeleteBin6Line
                                        className={
                                            "text-xl hover:text-red-500 text-gray-500 ml-10"
                                        }
                                        onClick={() => alert(123)}
                                    />
                                </div>
                            </a>
                        )
                    )}
                </div>
            </Wrapper>
        </div>
    );
}
