import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import Textbox from "../../../../components/Textbox";
import { CheckCircleIcon, PhotoIcon } from "@heroicons/react/20/solid";
import useForm from "../../../../hooks/useForm";
import PostImages from "../../../../api/postImages";
import { useRouter } from "next/router";
import UserSuccessBox from "../../../../components/UserSuccessBox";
import fileToBase64 from "../../../../helpers/fileToBase64";
import Image from "next/image";
import Toast from "../../../../components/Toast";

declare type ErrorType = {
  wording: any;
  images64: any;
};

export default function AddPostImages() {
  const inputRef = useRef<any>();
  const [{ wording }, handleChange] = useForm({
    wording: "",
    images64: "",
  });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [post, setPostId] = useState("");
  const [url, setUrl] = useState("");
  const [images64, setImages64] = useState("");
  const [imagesURL, setImagesURL] = useState("");
  const [entreprize, setEntreprize] = useState("");
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await PostImages.add(
      {
        entreprize_id: entreprize,
        post_id: post,
        wording,
        images64,
      },
      entreprize
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        wording: errors.wording && errors.wording[0],
        images64: errors.images64 && errors.images64[0],
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };
  const loadImage = async (e: any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImagesURL(url);
    const image = await fileToBase64(e.target.files[0]);
    setImages64(image as string);
  };
  const pickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const router = useRouter();
  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize");
    setEntreprize(entreprize as string);
    setPostId(router.query.post as string);
    setUrl(("/staff/post-images/" + router.query.post) as string);
  }, []);

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Image d&apos;ajout au post enregistrée"
        path={url}
        message="L&apos;image d&apos;ajout au post a été créé avec succès, vous pouvez maintenant vous connecter sur le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Nouvelle image" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Nouvelle image" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour enregistrer une image au post
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <input onChange={loadImage} type="file" hidden ref={inputRef} />
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={handleChange}
                value={wording as string}
                error={error && error.wording}
                name="wording"
                type="text"
                placeholder="Description"
              />
            </div>
            <div className="w-full flex justify-between md:space-x-1 md:flex-row flex-col">
              <div className="md:w-1/2 w-full">
                <div className="h-40  w-full border mx-auto mb-3 relative">
                  {imagesURL ? (
                    <Image
                      src={imagesURL}
                      width={"0"}
                      height="0"
                      className="w-full h-full object-cover"
                      sizes="100vw"
                      alt="User's image placeholder"
                    />
                  ) : (
                    <div className="grid place-items-center h-full text-gray-600 text-sm">
                      Ajouter l&apos;image d&apos;ajout au post
                    </div>
                  )}
                  <input
                    onChange={loadImage}
                    type="file"
                    hidden
                    ref={inputRef}
                  />
                  <span
                    onClick={pickImage}
                    className="absolute bottom-2 right-4 h-7 w-7 bg-blue-600 text-white rounded-full cursor-pointer grid place-items-center"
                  >
                    <PhotoIcon className="h-5 w-5" />
                  </span>
                </div>
                {error?.images64 && (
                  <small className="text-red-500 text-sm">
                    {error?.images64}
                  </small>
                )}
              </div>
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
