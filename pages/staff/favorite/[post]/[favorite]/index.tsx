import Link from "next/link"
import { useRouter } from "next/router"
import { FunctionComponent, useCallback, useEffect, useState } from "react"
import PostVid from "../../../../../api/postVideos"
import FormHeader from "../../../../../components/FormHeader"
import ReusableHeader from "../../../../../components/ReusableHeader"
import "moment/locale/fr"
import PostVidDetails from "../../../../../components/PostVidDetails"
import { PencilIcon, PrinterIcon, XMarkIcon } from "@heroicons/react/20/solid"
import Toast from "../../../../../components/Toast"

const UniquePostVidDetails : FunctionComponent = () => {
  const router = useRouter()
  const [postVid, setPostVid] = useState<any>()
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const getPostVid = useCallback(async (id:string,entreprizeId:string) =>{
    const result = await PostVid.get(id, entreprizeId)
      if (result.statusCode == 200) {
        setPostVid(result)
      }
    },[])
    useEffect(() => {
        if (router.isReady) {
          const entreprize = localStorage.getItem("entreprize")
          getPostVid(router.query.vid as string, entreprize as string)
        }
    }, [router, getPostVid])
  const onclickDelete = async () => {
    setToast("hide");
    const result = await PostVid.delete(postVid.pk)
    if (result.type === "error") {
      setToast("show");
      setMsg(result.data.detail);
    } else {
      router.push("/staff/post-vid/" + router.query.post as string)
    }
  }    
    return (
      <>
        <ReusableHeader text="Information sur la vidéo d'un post" />
        <div className="md:w-11/12 w-full relative mx-auto flex flex-col  md:h-[600px]">
          <Toast message={msg} set={toast} />
          <div className="md:w-full w-11/12 mx-auto items-center  flex justify-between">
            <FormHeader title="Information sur la vidéo d'un post" />
            <Link
              href={"/staff/post-vid/" + router.query.post as string + "/" + postVid?.pk + "/update"}
              className="w-fit h-fit p-1 ml-2 rounded bg-blue-600 text-white"
              >
              <span className="hidden md:flex"> Modifier</span>
              <PencilIcon className="md:hidden w-5 h-5" />
            </Link>
          </div>
          <div className="w-full text-sm md:text-base flex md:justify-between mx-auto h-auto">
            <PostVidDetails postVid={postVid} />
          </div>
          <div className="flex w-11/12 mx-auto  mb-3">
            <span
              onClick={onclickDelete}
              className="bg-red-600 flex items-center cursor-pointer hover:bg-red-700 py-1.5 text-white px-2  rounded"
            >
              Supprimer cette vidéo
              <XMarkIcon className="w-5 h-5 ml-2" />
            </span>
          </div>
        </div>
      </>
    );
}

export default UniquePostVidDetails