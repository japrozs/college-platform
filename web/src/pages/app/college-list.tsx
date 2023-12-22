import { AddCollegeModal } from "@/components/modals/add-college";
import { Spinner } from "@/components/shared/spinner";
import { Wrapper } from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import { List } from "@/components/ui/list";
import { useIsAuth } from "@/utils/use-is-auth";
import { GoPlus } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";

export default function CollegeList() {
    const { data, loading } = useIsAuth();
    return (
        <div>
            <Wrapper>
                {data && data.me && !loading ? (
                    <List data={data} />
                ) : (
                    <div className="flex flex-col items-center justify-center max-w-full min-h-screen">
                        <Spinner />
                    </div>
                )}
            </Wrapper>
        </div>
    );
}
