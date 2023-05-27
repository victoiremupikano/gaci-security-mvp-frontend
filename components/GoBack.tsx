import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

export default function GoBack() {
    const router = useRouter()
    return <span onClick={()=> router.back()} className="h-7 w-7 cursor-pointer rounded-full mr-3 bg-blue-600 text-white grid place-items-center">
        <ArrowLeftIcon className="h-6 w-6"/>
    </span>
}