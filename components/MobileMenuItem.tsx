import Link from "next/link";

declare type Props = {
    Icon: JSX.Element,
    name: string,
  path?: string
    onClick?:() => void
}
export default function MobileMenuItem({Icon, name,path, onClick}: Props) {
    return (
      <Link  onClick={onClick}
        href={path || "/"}
        className=" text-gray-600 flex mb-1 rounded hover:bg-gray-200 py-0.5 items-center justify-left"
      >
        <span className="w-8 h-8 bg-gray-200 mr-4 rounded grid place-items-center">
          {Icon}
        </span>
            <span>{name}</span>
      </Link>
    );
}