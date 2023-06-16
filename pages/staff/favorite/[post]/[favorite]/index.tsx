import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import PostFavorite from "../../../../../api/postFavorite";
import FormHeader from "../../../../../components/FormHeader";
import ReusableHeader from "../../../../../components/ReusableHeader";
import "moment/locale/fr";
import PostFavoriteDetails from "../../../../../components/PostFavoriteDetails";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Toast from "../../../../../components/Toast";

const UniquePostFavoriteDetails: FunctionComponent = () => {
  const router = useRouter();
  const [postFavorite, setPostFavorite] = useState<any>();
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const getPostFavorite = useCallback(
    async (id: string, entreprizeId: string) => {
      const result = await PostFavorite.get(id, entreprizeId);
      if (result.statusCode == 200) {
        setPostFavorite(result);
      }
    },
    []
  );
  useEffect(() => {
    if (router.isReady) {
      const entreprize = localStorage.getItem("entreprize");
      getPostFavorite(router.query.favorite as string, entreprize as string);
    }
  }, [router, getPostFavorite]);
  const onclickDelete = async () => {
    setToast("hide");
    const result = await PostFavorite.delete(postFavorite.pk);
    if (result.type === "error") {
      setToast("show");
      setMsg(result.data.detail);
    } else {
      router.push(("/staff/favorite/" + router.query.post) as string);
    }
  };
  return (
    <>
      <ReusableHeader text="Information sur un favoris" />
      <div className="md:w-11/12 w-full relative mx-auto flex flex-col  md:h-[600px]">
        <Toast message={msg} set={toast} />
        <div className="md:w-full w-11/12 mx-auto items-center  flex justify-between">
          <FormHeader title="Information sur un favoris" />
        </div>
        <div className="w-full text-sm md:text-base flex md:justify-between mx-auto h-auto">
          <PostFavoriteDetails postFavorite={postFavorite} />
        </div>
        <div className="flex w-11/12 mx-auto  mb-3">
          <span
            onClick={onclickDelete}
            className="bg-red-600 flex items-center cursor-pointer hover:bg-red-700 py-1.5 text-white px-2  rounded"
          >
            Supprimer ce favoris
            <XMarkIcon className="w-5 h-5 ml-2" />
          </span>
        </div>
      </div>
    </>
  );
};

export default UniquePostFavoriteDetails;
