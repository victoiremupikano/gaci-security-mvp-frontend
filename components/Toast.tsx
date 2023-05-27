import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

declare type Props = {
    message?: string
    type?: "success" | "failure"
    set : "hide" | "show"
}
export default function Toast({ message, set,type = "failure" }: Props) {
    const [hide, setHide] = useState(true)
    const [msg, setMsg] = useState('')
    useEffect(() => {
        if (set == "hide") {
            setHide(true)
        }
        if (set == "show") {
            setHide(false)
        }
        setMsg(message as string)
    },[set, message])
    if(!hide) return (
      <div data-aos='slide-down'
        className={`w-80 flex rounded items-center  justify-between top-2 left-10  px-2 h-21 absolute ${
          type === "success"
            ? "bg-green-200 text-green-600 font-semibold"
            : "bg-red-200 text-red-600 font-semibold"
        }`}
        >
            <div className="w-10/12 text-center">{msg}</div>
            <span onClick={()=> setHide(true)} className="h-10 cursor-pointer  w-10 grid place-items-center"><XMarkIcon className="h-8 w-8"/></span>
        </div>
    );
    else return <span></span>
}