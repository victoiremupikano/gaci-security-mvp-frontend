import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

declare type Props = {
    icon: JSX.Element
    text: string
    path : string
}
export default function NoStaffSideNavigationItem({ icon, text, path }: Props) {
    const [isActive, setIsActive] = useState<boolean>()
    const setPathToCurrentOne = () => {
        
    }
    return (
      <Link
        onClick={setPathToCurrentOne}
        href={path}
        className={`flex ${
          isActive ? "bg-blue-600 text-white text-sm lg:text-base " : " text-gray-700"
        } hover:bg-gray-200 transition-colors duration-500 items-center px-1 py-1.5`}
      >
        <span
          className={`w-7 h-7 rounded bg-gray-200 grid place-items-center ${
            isActive ? "text-blue-600" : "text-gray-600"
          } `}
        >
          {icon}
        </span>
        <span className="ml-3 ">{text}</span>
      </Link>
    );
}