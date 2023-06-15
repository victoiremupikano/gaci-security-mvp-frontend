import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import Author from "./Author";
import Section3 from "../pages/unconected/pub/sections/section3";
import PostPubUniqueImagesModel from "./PostPubUniqueImagesModel";
import PostPubUniqueDocsModel from "./PostPubUniqueDocsModel";
import PostPubUniqueVidModel from "./PostPubUniqueVidModel";

type Props = {
  index?: number;
  post: any;
};
const PostPubUniqueModel: FunctionComponent<Props> = ({ index, post }) => {
  return (
    <section className="container mx-auto md:px-2 md:w-1/2 p-5">
      <div className="flex justify-center">
        <Author user={post?.user?.pk} />
      </div>
      <div className="post py-10">
        <h1 className="font-bold text-4xl text-center pb-5">
          {post?.title || "No Title"}
        </h1>

        <p className="text-gray-500 text-xl text-center">
          {post?.synthesis || "No Synthesis"}
        </p>

        <div className="py-10">
          <Image
            src={post?.image || "/placeholder.jpg"}
            alt="img"
            height={600}
            width={900}
          />
        </div>

        <div className="content text-gray-600 text-lg flex flex-col gap-4">
          {post?.text || "No Text"}
        </div>

        {/* les images supplementaires du post */}
        <PostPubUniqueImagesModel post={post?.pk} />
        {/* les documents supplementaires du post */}
        <PostPubUniqueDocsModel post={post?.pk} />
        {/* les videos supplementaires du post */}
        <PostPubUniqueVidModel post={post?.pk} />

        <div className="content text-gray-600 py-10 text-lg flex flex-col gap-4">
          {post?.conclusion || "No Conclusion"}
        </div>
      </div>
    </section>
  );
};

export default PostPubUniqueModel;
