import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import PostDocs from "../../../../../api/postDocs";
import FormHeader from "../../../../../components/FormHeader";
import ReusableHeader from "../../../../../components/ReusableHeader";
import "moment/locale/fr";
import PostDocsDetails from "../../../../../components/PostDocsDetails";
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Toast from "../../../../../components/Toast";

const UniquePostDocsDetails: FunctionComponent = () => {
  const router = useRouter();
  const [postDocs, setPostDocs] = useState<any>();
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const getPostDocs = useCallback(async (id: string, entreprizeId: string) => {
    const result = await PostDocs.get(id, entreprizeId);
    if (result.statusCode == 200) {
      setPostDocs(result);
    }
  }, []);
  useEffect(() => {
    if (router.isReady) {
      const entreprize = localStorage.getItem("entreprize");
      getPostDocs(router.query.docs as string, entreprize as string);
    }
  }, [router, getPostDocs]);
  const onclickDelete = async () => {
    setToast("hide");
    const result = await PostDocs.delete(postDocs.pk);
    if (result.type === "error") {
      setToast("show");
      setMsg(result.data.detail);
    } else {
      router.push(("/staff/post-docs/" + router.query.post) as string);
    }
  };
  return (
    <>
      <ReusableHeader text="Information sur le document d'un post" />
      <div className="md:w-11/12 w-full relative mx-auto flex flex-col  md:h-[600px]">
        <Toast message={msg} set={toast} />
        <div className="md:w-full w-11/12 mx-auto items-center  flex justify-between">
          <FormHeader title="Information sur le document d'un post" />
          <Link
            href={
              (("/staff/post-docs/" + router.query.post) as string) +
              "/" +
              postDocs?.pk +
              "/update"
            }
            className="w-fit h-fit p-1 ml-2 rounded bg-blue-600 text-white"
          >
            <span className="hidden md:flex"> Modifier</span>
            <PencilIcon className="md:hidden w-5 h-5" />
          </Link>
        </div>
        <div className="w-full text-sm md:text-base flex md:justify-between mx-auto h-auto">
          <PostDocsDetails postDocs={postDocs} />
        </div>
        <div className="flex w-11/12 mx-auto  mb-3">
          <span
            onClick={onclickDelete}
            className="bg-red-600 flex items-center cursor-pointer hover:bg-red-700 py-1.5 text-white px-2  rounded"
          >
            Supprimer ce document
            <XMarkIcon className="w-5 h-5 ml-2" />
          </span>
        </div>
      </div>
    </>
  );
};

export default UniquePostDocsDetails;
