import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import GoBack from "./GoBack";

declare type Props = {
    title:string
}
export default function FormHeader({ title }: Props) {
    return (
      <div className="w-full flex bg-white h-14">
        <div className="w-full h-full flex items-center mx-auto ">
          <GoBack/>
          <span className="text-blue-600 font-bold md:text-xl">{title}</span>{" "}
        </div>
      </div>
    );
}