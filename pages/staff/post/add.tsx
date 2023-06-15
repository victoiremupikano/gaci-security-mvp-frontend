import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import FormHeader from "../../../components/FormHeader";
import ReusableHeader from "../../../components/ReusableHeader";
import Textbox from "../../../components/Textbox";
import { CheckCircleIcon, PhotoIcon, RssIcon } from "@heroicons/react/20/solid";
import Checkbox from "../../../components/Checkbox";
import useForm from "../../../hooks/useForm";
import Post from "../../../api/post"
import UserSuccessBox from "../../../components/UserSuccessBox";
import fileToBase64 from "../../../helpers/fileToBase64";
import Image from "next/image";
import { randomUUID } from "crypto";
import Toast from "../../../components/Toast";

declare type ErrorType = {
  title: any;
  synthesis: any;
  text: any;
  conclusion: any;
  image64: any;
};

export default function AddPost() {
  const inputRef = useRef<any>();
  const [{title, synthesis, text, conclusion},handleChange,
  ] = useForm({
    title: "",
    synthesis: "",
    text: "",
    conclusion: "",
    image64: ""
  });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [status, setStatus] = useState(false)
  const [popular, setPopular] = useState(false)
  const [repost, setRepost] = useState(false)
  const [image64, setImage64] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [entreprize, setEntreprize] = useState("")
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await Post.add({
      entreprize_id:entreprize,
      title: title,
      synthesis,
      text,
      conclusion,
      image64,
      status,
      popular,
      repost
    }, entreprize);
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        title: errors.title && errors.title[0],
        synthesis: errors.synthesis && errors.synthesis[0],
        text: errors.text && errors.text[0],
        conclusion: errors.conclusion && errors.conclusion[0],
        image64: errors.image64 && errors.image64[0],
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };
  const onClickCheckboxStatus = (e: any) => setStatus(e.target.checked);
  const onClickCheckboxPopular = (e: any) => setPopular(e.target.checked);
  const onClickCheckboxRepost = (e: any) => setRepost(e.target.checked);
  const loadImage = async (e: any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImageURL(url);
    const image = await fileToBase64(e.target.files[0]);
    setImage64(image as string);
  };
  const pickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize")
    setEntreprize(entreprize as string)
  },[])

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Post enregistrée"
        path="/staff/post"
        message="Le post a été créé avec succès, vous pouvez maintenant vous connecter sur le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Nouveau post" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Nouveau post" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour enregistrer un nouveau post
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <input onChange={loadImage} type="file" hidden ref={inputRef} />
            <div className="w-full flex-col flex justify-between md:space-x-0">
              <Textbox
                event={handleChange}
                value={title as string}
                error={error && error.title}
                name="title"
                type="text"
                placeholder="Titre"
              />
              <Textbox
                event={handleChange}
                value={synthesis as string}
                error={error && error.synthesis}
                name="synthesis"
                type="text"
                placeholder="Synthèse du post"
              />
              <Textbox
                event={handleChange}
                value={text as string}
                error={error && error.text}
                name="text"
                type="text"
                placeholder="Contenu du post"
              />
              <Textbox
                event={handleChange}
                value={conclusion as string}
                error={error && error.conclusion}
                name="conclusion"
                type="text"
                placeholder="Conclusion"
              />
            </div>
            <Checkbox
              name="status"
              event={onClickCheckboxStatus}
              value={status}
              title="Cochez pour spécifier si la publication directe."
            />
            <Checkbox
              name="popular"
              event={onClickCheckboxPopular}
              value={popular}
              title="Publcation populaire."
            />
            <Checkbox
              name="repost"
              event={onClickCheckboxRepost}
              value={repost}
              title="Reposter l'article à chaque fois."
            />
            <div className="w-full flex justify-between md:space-x-1 md:flex-row flex-col">
              <div className="md:w-1/2 w-full">
                <div className="h-40  w-full border mx-auto mb-3 relative">
                  {imageURL ? (
                    <Image
                      src={imageURL}
                      width={"0"}
                      height="0"
                      className="w-full h-full object-cover"
                      sizes="100vw"
                      alt="User's image placeholder"
                    />
                  ) : (
                    <div className="grid place-items-center h-full text-gray-600 text-sm">
                      Ajouter l&apos;image principale du post
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
                {error?.image64 && (
                  <small className="text-red-500 text-sm">
                    {error?.image64}
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
