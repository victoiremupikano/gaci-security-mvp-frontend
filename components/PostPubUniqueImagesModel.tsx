import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { FunctionComponent } from "react";
import PostImages from "../api/postImages";
import React, { MouseEventHandler, useEffect, useState } from "react";

type Props = {
  index?: any;
  post: any;
};
const PostPubUniqueImagesModel: FunctionComponent<Props> = ({
  index,
  post,
}) => {
  const [postsImages, setPostImages] = useState<Array<any>>();
  const [loading, setLoading] = useState(false);
  const getPostImages = async (postId: string, entreprizeId: string) => {
    setLoading(true);
    const result = await PostImages.getByPost(postId, entreprizeId);
    if (result.results) {
      setPostImages(result.results);
    }
    setLoading(false);
  };
  // on charge le profile
  useEffect(() => {
    if (post) {
      const entreprize = localStorage.getItem("entreprize");
      getPostImages(post, entreprize as string);
    }
  }, [post]);

  if (!post) return <></>;

  return (
    <div className="flex flex-col gap-6 py-5">
      {!loading ? (
        Array.isArray(postsImages) && postsImages.length > 0 ? (
          postsImages.map((a, index) => {
            return (
              <div key={index} className="flex gap-5">
                <div className="image flex flex-col justify-start">
                  <Link href={"#"}>
                    <Image
                      className="rounded"
                      src={a?.images || "/placeholder.jpg"}
                      alt="img"
                      height={250}
                      width={300}
                    />
                  </Link>
                </div>
                <div className="info flex justify-center flex-col">
                  <div className="cat">
                    <Link href={"#"}>
                      <p className="text-orange-600 hover:text-orange-800">
                        {"Image supplémentaire"}
                      </p>
                    </Link>
                    <Link href={"#"}>
                      <p className="text-gray-800 hover:text-gray-600">
                        - {moment(a?.date_add).format("ll") || "Unknown"}
                      </p>
                    </Link>
                  </div>
                  <div className="title">
                    <Link href={"#"}>
                      <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
                        {a?.wording || "No Wording"}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          "No data"
        )
      ) : (
        <div className="flex h-40 w-full font-semibold  items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default PostPubUniqueImagesModel;
