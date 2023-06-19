import { MouseEventHandler, useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import FormHeader from "../../../../../components/FormHeader";
import ReusableHeader from "../../../../../components/ReusableHeader";
import Textbox from "../../../../../components/Textbox";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import PostVid from "../../../../../api/postVideos";
import UserSuccessBox from "../../../../../components/UserSuccessBox";
import { useRouter } from "next/router";
import Toast from "../../../../../components/Toast";

declare type ErrorType = {
  wording: any;
  url: any;
};

export default function UpdatePostDocs() {
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [wording, setWording] = useState("");
  const [url, setUrl] = useState("");
  const [_url, _setUrl] = useState("");
  const [post, setPostId] = useState("");
  const [_postVid, setPostVid] = useState<any>({});
  const [entreprize, setEntreprize] = useState("");
  const [id, setId] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setToast("hide");
    const result = await PostVid.update(
      {
        entreprize_id: entreprize,
        post_id: post,
        wording,
        url,
      },
      id
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        wording: errors.wording && errors.wording[0],
        url: errors.url && errors.url[0],
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };
  const getPostVid = async (id: string, entreprize_id: string) => {
    const result = await PostVid.get(id, entreprize_id);
    if (result.pk) {
      setPostVid(result);
      setId(result.pk);
      setWording(result.wording);
      setUrl(result.url);
    }
  };
  const router = useRouter();
  const { vid } = router.query;
  const entreprize_ = localStorage.getItem("entreprize");

  useEffect(() => {
    setEntreprize(entreprize_ as string);
    setPostId(router.query.post as string);
    getPostVid(vid as string, entreprize_ as string);
    _setUrl(("/staff/post-vid/" + router.query.post) as string);
  }, [router, vid, entreprize_]);

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Modification effectuée"
        path={_url}
        message="La vidéo d'ajout au post a été modifier avec succès, vous pouvez maintenant le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Modification de la vidéo ajouté" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Modification de la vidéo ajouté" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour modifier la vidéo ajouté
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={(e) => setWording(e.target.value)}
                value={wording as string}
                error={error && error.wording}
                name="wording"
                type="text"
                placeholder="Description"
              />
              <Textbox
                event={(e) => setUrl(e.target.value)}
                value={url as string}
                error={error && error.url}
                name="url"
                type="text"
                placeholder="Lien de la vidéo"
              />
            </div>
            <Button
              event={onClickRegister}
              size="fit"
              content={
                <div className="flex justify-around">
                  Enregister <CheckCircleIcon className="h-6 w-6 ml-3" />
                </div>
              }
              design="primary"
              type="button"
            />
          </form>
        </div>
      </div>
    </>
  );
}
