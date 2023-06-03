import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import FormHeader from "../../../components/FormHeader";
import ReusableHeader from "../../../components/ReusableHeader";
import Textbox from "../../../components/Textbox";
import {
  CheckCircleIcon,
  CheckIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";
import useForm from "../../../hooks/useForm";
import user from "../../../api/user";
import UserSuccessBox from "../../../components/UserSuccessBox";
import Image from "next/image";
import useVerify from "../../../hooks/useVerify";
import fileToBase64 from "../../../helpers/fileToBase64";
import Profile from "../../../api/profile";
import { useRouter } from "next/router";

declare type ErrorType = {
  adress: any;
  kind: any;
  picture64: any;
};

export default function AddProfile() {
  const router = useRouter()
  const inputRef = useRef<any>();
  const [id, setId] = useState<string|number>();
  const [{ address }, handleChange] = useForm({
    address: "",
  });
  const [sex, setSex] = useState("");
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [picture64, setPicture64] = useState<any>("");
  const [imageURL, setImageURL] = useState<string>("/placeholder.jpg");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await Profile.create({
      kind: sex,
      adress: address,
      picture64,
    });
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        kind: errors.kind && errors.kind[0],
        adress: errors.adress && errors.adress[0],
        picture64: errors.picture64 && errors.picture64[0],
      });
    } else if (result.user) {
      setShowSuccessBox(true);
    }
  };
  useVerify();
  useEffect(() => {
    if (router.query.user) {
     setId(router.query.user as string)
   }
  }, [router.query.user]);
  const setSexTo = (value: string) => setSex(value);
  const pickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const loadImage = async (e: any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImageURL(url);
    const image = await fileToBase64(e.target.files[0]);
    setPicture64(image);
  };
  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="Voir plus"
        title="Inscription effectuée"
        path="/nostaff/profiles/"
        message="Votre profile de compte a été créé avec succès, vous pouvez maintenant le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Completion du profil" />
      <div className="flex items-center justify-center w-11/12 h-auto mx-auto md:w-5/12">
        <div className="flex flex-col justify-around w-full h-auto rounded ">
          <div className="flex flex-col items-center">
            <FormHeader title="Completion du profil" />
            <small className="w-10/12 mx-auto my-3 text-xs text-gray-500 md:w-11/12">
              Modifier les informations du formulaire ci-bas en fin de mettre
              votre profil en jour
            </small>
          </div>
          <form className="w-full mx-auto mt-2">
            <div className="relative w-40 h-40 mx-auto mb-3 border rounded-full">
              <Image
                src={imageURL}
                width={"0"}
                height="0"
                className="object-cover w-full h-full rounded-full"
                sizes="100vw"
                alt="User's image placeholder"
              />
              <input onChange={loadImage} type="file" hidden ref={inputRef} />
              <span
                onClick={pickImage}
                className="absolute grid text-white bg-blue-600 rounded-full cursor-pointer bottom-2 right-4 h-7 w-7 place-items-center"
              >
                <PhotoIcon className="w-5 h-5" />
              </span>
            </div>
            {error?.picture64 && (
              <small className="text-sm text-red-500">{error?.picture64}</small>
            )}
            <Textbox
              event={handleChange}
              value={address as string}
              error={error && error.adress}
              name="address"
              type="text"
              placeholder="Addresse"
            />
            <div className="relative flex items-center justify-center w-full h-20 mb-4 bg-gray-100 rounded">
              <span className="absolute text-gray-600 top-3 left-2">Sexe</span>
              <div className="flex justify-around w-full mt-6">
                <span
                  onClick={() => setSexTo("Masculin")}
                  className={`${
                    sex === "Masculin"
                      ? "bg-blue-600 border-transparent text-white"
                      : "bg-white text-blue-600 border-blue-600"
                  } rounded-full border-2 border-blue-600 cursor-pointer transition-colors duration-500  px-1.5 py-0.5 flex items-center`}
                >
                  Masculin{" "}
                  {sex === "Masculin" ? (
                    <CheckIcon className="w-4 h-4 ml-1" />
                  ) : null}
                </span>
                <span
                  onClick={() => setSexTo("Feminin")}
                  className={`${
                    sex === "Feminin"
                      ? "bg-blue-600 border-transparent text-white"
                      : "bg-white text-blue-600 border-blue-600"
                  } rounded-full border-2 border-blue-600 cursor-pointer transition-colors duration-500  px-1.5 py-0.5 flex items-center`}
                >
                  Feminin{" "}
                  {sex === "Feminin" ? (
                    <CheckIcon className="w-4 h-4 ml-1" />
                  ) : null}
                </span>
              </div>
              {error?.kind && (
                <small className="absolute text-sm text-red-500 left-2 -bottom-6">
                  {error?.kind}
                </small>
              )}
            </div>
            <Button
              event={onClickRegister}
              size="fit"
              content={
                <div className="flex justify-around">
                  Enregister <CheckCircleIcon className="w-6 h-6 ml-3" />
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
