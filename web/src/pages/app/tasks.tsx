import { Spinner } from "@/components/shared/spinner";
import { Wrapper } from "@/components/shared/wrapper";
import { Task } from "@/components/tasks/task";
import { useIsAuth } from "@/utils/use-is-auth";
import React from "react";

interface TasksProps {}

const Tasks: React.FC<TasksProps> = ({}) => {
    const { data, loading } = useIsAuth();
    return (
        <div>
            <Wrapper>
                {data && data.me && !loading ? (
                    <Task data={data} />
                ) : (
                    <div className="flex flex-col items-center justify-center max-w-full min-h-screen">
                        <Spinner />
                    </div>
                )}
            </Wrapper>
        </div>
    );
};

export default Tasks;
