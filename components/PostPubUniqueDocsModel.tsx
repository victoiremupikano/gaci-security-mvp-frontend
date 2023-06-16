import Link from "next/link";
import moment from "moment";
import { FunctionComponent } from "react";
import PostDocs from "../api/postDocs";
import React, { useEffect, useState } from "react";

type Props = {
  index?: any;
  post: any;
};

const PostPubUniqueDocsModel: FunctionComponent<Props> = ({ index, post }) => {
  const [postsDocs, setPostDocs] = useState<Array<any>>();
  const [loading, setLoading] = useState(false);
  const getPostDocs = async (postId: string, entreprizeId: string) => {
    setLoading(true);
    const result = await PostDocs.getByPost(postId, entreprizeId);
    if (result.results) {
      setPostDocs(result.results);
    }
    setLoading(false);
  };
  // on charge le profile
  useEffect(() => {
    if (post) {
      const entreprize = localStorage.getItem("entreprize");
      getPostDocs(post, entreprize as string);
    }
  }, [post]);

  if (!post) return <></>;

  return (
    <div className="flex flex-col gap-6 py-5">
      {!loading ? (
        Array.isArray(postsDocs) && postsDocs.length > 0 ? (
          postsDocs.map((a, index) => {
            return (
              <div key={index} className="flex gap-5">
                <div className="info flex justify-center flex-col">
                  <div className="cat">
                    <p className="font-bold text-gray-800 hover:text-gray-600">
                      {"Document supplémentaire"}
                    </p>
                    <p className="text-gray-800 hover:text-gray-600">
                      - {moment(a?.date_add).format("ll") || "Unknown"}
                    </p>
                  </div>
                  <div className="title">
                    <Link href={a?.docs}>
                      <p className="text-orange-600 hover:text-orange-800">
                        {a?.docs.substr(0, 35) + "..." || "No Docs Link"}
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

export default PostPubUniqueDocsModel;
