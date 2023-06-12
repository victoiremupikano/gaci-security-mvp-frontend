import Image from "next/image";
import Link from "next/link";

export default function author( names : any, email : any, img : any) {
  if(!names && !email && !img) return <></>;

  return (
    <div className="author flex py-5">
      <Image
        className="rounded-full"
        sizes="100vw"
        src={img || '/placeholder.jpg'}
        alt="img author"
        height="60"
        width="60"
      />     
      <div className="flex flex-col justify-center px-4">
        <Link href={"#"}><a className="text-md font-bold text-gray-800 hover:text-gray-600">{names || "No Names"}</a></Link>
        <span className="text-sm text-gray-500">{email || "No email"}</span>
      </div>
    </div>
  )
}
