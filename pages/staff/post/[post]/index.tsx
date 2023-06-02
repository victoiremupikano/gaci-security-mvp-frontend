import Link from "next/link"
import { useRouter } from "next/router"
import { FunctionComponent, useCallback, useEffect, useState } from "react"
import Post from "../../../../api/post"
import FormHeader from "../../../../components/FormHeader"
import ReusableHeader from "../../../../components/ReusableHeader"
import "moment/locale/fr"
import PostDetails from "../../../../components/PostDetails"
import { PencilIcon, PrinterIcon, XMarkIcon } from "@heroicons/react/20/solid"
import Toast from "../../../../components/Toast"

const UniquePostDetails : FunctionComponent = () => {
  const router = useRouter()
  const [post, setPost] = useState<any>()
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const getPost = useCallback(async (id:string,entreprizeId:string) =>{
    const result = await Post.get(id, entreprizeId)
      if (result.statusCode == 200) {
        setPost(result)
      }
    },[])
    useEffect(() => {
        if (router.isReady) {
          const entreprize = localStorage.getItem("entreprize")
          getPost(router.query.post as string, entreprize as string)
        }
    }, [router, getPost])
  const onclickDelete = async () => {
    setToast("hide");
    const result = await Post.delete(post.pk)
    if (result.type === "error") {
      setToast("show");
      setMsg(result.data.detail);
    } else {
      router.push("/staff/post")
    }
  }    
    return (
      <>
        <ReusableHeader text="Information sur un post" />
        <div className="md:w-11/12 w-full relative mx-auto flex flex-col  md:h-[600px]">
          <Toast message={msg} set={toast} />
          <div className="md:w-full w-11/12 mx-auto items-center  flex justify-between">
            <FormHeader title="Information sur un post" />
            <Link
              href={"/staff/post/" + post?.pk + "/update"}
              className="w-fit h-fit p-1 ml-2 rounded bg-blue-600 text-white"
              >
              <span className="hidden md:flex"> Modifier</span>
              <PencilIcon className="md:hidden w-5 h-5" />
            </Link>
          </div>
          <div className="w-full text-sm md:text-base flex md:justify-between mx-auto h-auto">
            <PostDetails post={post} />
          </div>
          <div className="flex w-11/12 mx-auto  mb-3">
            <Link
              href={"/staff/post-images/" + post?.pk}
              className="bg-blue-600 flex items-center cursor-pointer hover:bg-blue-700 py-1.5 text-white px-2  rounded"
              >
              Images
              <XMarkIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href={"/staff/post-docs/" + post?.pk}
              className="ml-2 bg-blue-600 flex items-center cursor-pointer hover:bg-blue-700 py-1.5 text-white px-2  rounded"
              >
              Fichiers
              <XMarkIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href={"/staff/post-vid/" + post?.pk}
              className="ml-2 bg-blue-600 flex items-center cursor-pointer hover:bg-blue-700 py-1.5 text-white px-2  rounded"
              >
              Vidéos
              <XMarkIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
          <div className="flex w-11/12 mx-auto  mb-3">
            <Link
              href={"/staff/coment/" + post?.pk}
              className="bg-blue-600 flex items-center cursor-pointer hover:bg-blue-700 py-1.5 text-white px-2  rounded"
              >
              Commentaires
              <XMarkIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href={"/staff/favorite/" + post?.pk}
              className="ml-2 bg-blue-600 flex items-center cursor-pointer hover:bg-blue-700 py-1.5 text-white px-2  rounded"
              >
              Favoris
              <XMarkIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
          <div className="flex w-11/12 mx-auto  mb-3">
            <span
              onClick={onclickDelete}
              className="bg-red-600 flex items-center cursor-pointer hover:bg-red-700 py-1.5 text-white px-2  rounded"
            >
              Supprimer ce post
              <XMarkIcon className="w-5 h-5 ml-2" />
            </span>
          </div>
        </div>
      </>
    );
}

export default UniquePostDetails