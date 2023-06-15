import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import {FunctionComponent} from "react"
import Author from "./Author"
type Props = {
    index?: number
    post : any
}
const PostSection3Model: FunctionComponent<Props> = ({index, post}) => {
  return (
    <div className="grid">
      <div className="images">
        <Link href={`/posts/${post?.pk}`}>
          <Image
            src={post?.image || "/placeholder.jpg"}
            alt="img author"
            height={400}
            width={600}
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={`/posts/${post?.pk}`}>
            <p className="text-orange-600 hover:text-orange-800">
              {"Catégorie unique"}
            </p>
          </Link>
          <Link href={`/posts/${post?.pk}`}>
            <p className="text-gray-800 hover:text-gray-600">
              - {moment(post?.date_add).format("ll") || "Unknown"}
            </p>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${post?.pk}`}>
            <p className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
              {post?.title || "No Title"}
            </p>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{post?.synthesis || "No Synthesis"}</p>
        <Author user={post?.user?.pk} />
      </div>
    </div>
  );
}

export default PostSection3Model