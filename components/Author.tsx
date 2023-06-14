import Image from "next/image";
import Link from "next/link";
import {FunctionComponent} from "react"

type Props = {
  index? : any
  user : any
}
const Author: FunctionComponent<Props> = ({index, user}) => {
  if(!user) return <></>;

  return (
    <div className="author flex py-5">
      <Image
        className="rounded-full"
        sizes="100vw"
        src={user.picture || '/placeholder.jpg'}
        alt="img author"
        height={60}
        width={45}
      />     
      <div className="flex flex-col justify-center px-4">
        <Link href={"#"} className="text-md font-bold text-gray-800 hover:text-gray-600">{user?.user?.names || "No Names"}</Link>
        <span className="text-sm text-gray-500">{user?.user?.email || "No email"}</span>
      </div>
    </div>
  );
}

export default Author
