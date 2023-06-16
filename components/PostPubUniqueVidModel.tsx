import Link from "next/link";
import moment from "moment";
import { FunctionComponent } from "react";
import PostVid from "../api/postVideos";
import React, { useEffect, useState } from "react";

type Props = {
  index?: any;
  post: any;
};

const PostPubUniqueVidModel: FunctionComponent<Props> = ({ index, post }) => {
  const [postsVid, setPostVid] = useState<Array<any>>();
  const [loading, setLoading] = useState(false);
  const getPostVid = async (postId: string, entreprizeId: string) => {
    setLoading(true);
    const result = await PostVid.getByPost(postId, entreprizeId);
    if (result.results) {
      setPostVid(result.results);
    }
    setLoading(false);
  };
  // on charge le profile
  useEffect(() => {
    if (post) {
      const entreprize = localStorage.getItem("entreprize");
      getPostVid(post, entreprize as string);
    }
  }, [post]);

  if (!post) return <></>;

  return (
    <div className="flex flex-col gap-6 py-5">
      {!loading ? (
        Array.isArray(postsVid) && postsVid.length > 0 ? (
          postsVid.map((a, index) => {
            return (
              <div key={index} className="flex gap-5">
                <div className="info flex justify-center flex-col">
                  <div className="cat">
                    <p className="font-bold text-gray-800 hover:text-gray-600">
                      {"Vidéo supplémentaire"}
                    </p>
                    <p className="text-gray-800 hover:text-gray-600">
                      - {moment(a?.date_add).format("ll") || "Unknown"}
                    </p>
                  </div>
                  <div className="title">
                    <Link href={a?.url}>
                      <p className="text-orange-600 hover:text-orange-800">
                        {a?.url.substr(0, 35) + "..." || "No Vid Link"}
                      </p>
                    </Link>
                  </div>
                  <div className="title">
                    <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
                      {a?.wording || "No Wording"}
                    </p>
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

export default PostPubUniqueVidModel;
