import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Post from "../../../../../api/post";
import "moment/locale/fr";
import PostPubUniqueModel from "../../../../../components/PostPubUniqueModel ";
import Section3 from "../sections/section3";
import ReusableFooter from "../../../../../components/ReusableFooter";

const UniquePostDetails: FunctionComponent = () => {
  const router = useRouter();
  const [post, setPost] = useState<any>();
  const getPost = useCallback(async (id: string, entreprizeId: string) => {
    const result = await Post.getNoStaff(id, entreprizeId);
    if (result.statusCode == 200) {
      setPost(result);
    }
  }, []);
  useEffect(() => {
    if (router.isReady) {
      const entreprize = localStorage.getItem("entreprize");
      getPost(router.query.pub as string, entreprize as string);
    }
  }, [router, getPost]);
  return (
    <>
      <PostPubUniqueModel post={post}></PostPubUniqueModel>
      <Section3></Section3>
      <ReusableFooter />
    </>
  );
};

export default UniquePostDetails;
