import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import Author from "./Author";
type Props = {
  index?: number;
  post: any;
};
const PostSection3Model: FunctionComponent<Props> = ({ index, post }) => {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={"/unconected/pub/" + post?.pk}>
          <Image
          className="rounded"
            src={post?.image || "/placeholder.jpg"}
            alt="img author"
            height={250}
            width={300}
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
        <Link href={"/unconected/pub/" + post?.pk}>
            <p className="text-orange-600 hover:text-orange-800">
              {"Catégorie unique"}
            </p>
          </Link>
          <Link href={"/unconected/pub/" + post?.pk}>
            <p className="text-gray-800 hover:text-gray-600">
              - {moment(post?.date_add).format("ll") || "Unknown"}
            </p>
          </Link>
        </div>
        <div className="title">
        <Link href={"/unconected/pub/" + post?.pk}>
            <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {post?.title || "No Title"}
            </p>
          </Link>
        </div>
        <Author user={post?.user?.pk} />
      </div>
    </div>
  );
};

export default PostSection3Model;
