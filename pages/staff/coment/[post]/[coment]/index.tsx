import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import PostComent from "../../../../../api/postComent";
import FormHeader from "../../../../../components/FormHeader";
import ReusableHeader from "../../../../../components/ReusableHeader";
import "moment/locale/fr";
import PostComentDetails from "../../../../../components/PostComentDetails";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Toast from "../../../../../components/Toast";

const UniquePostComentDetails: FunctionComponent = () => {
  const router = useRouter();
  const [postComent, setPostComent] = useState<any>();
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const getPostComent = useCallback(
    async (id: string, entreprizeId: string) => {
      const result = await PostComent.get(id, entreprizeId);
      if (result.statusCode == 200) {
        setPostComent(result);
      }
    },
    []
  );
  useEffect(() => {
    if (router.isReady) {
      const entreprize = localStorage.getItem("entreprize");
      getPostComent(router.query.coment as string, entreprize as string);
    }
  }, [router, getPostComent]);
  const onclickDelete = async () => {
    setToast("hide");
    const result = await PostComent.delete(postComent.pk);
    if (result.type === "error") {
      setToast("show");
      setMsg(result.data.detail);
    } else {
      router.push(("/staff/coment/" + router.query.post) as string);
    }
  };
  return (
    <>
      <ReusableHeader text="Information sur un coment" />
      <div className="md:w-11/12 w-full relative mx-auto flex flex-col  md:h-[600px]">
        <Toast message={msg} set={toast} />
        <div className="md:w-full w-11/12 mx-auto items-center  flex justify-between">
          <FormHeader title="Information sur un coment" />
        </div>
        <div className="w-full text-sm md:text-base flex md:justify-between mx-auto h-auto">
          <PostComentDetails postComent={postComent} />
        </div>
        <div className="flex w-11/12 mx-auto  mb-3">
          <span
            onClick={onclickDelete}
            className="bg-red-600 flex items-center cursor-pointer hover:bg-red-700 py-1.5 text-white px-2  rounded"
          >
            Supprimer ce coment
            <XMarkIcon className="w-5 h-5 ml-2" />
          </span>
        </div>
      </div>
    </>
  );
};

export default UniquePostComentDetails;
