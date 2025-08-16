import { Loader2Icon } from "lucide-react";

const Loading = () => {
    return (
        <div className="min-h-screen grid place-items-center">
            <Loader2Icon className="animate-spin" />
        </div>
    );
};

export default Loading;