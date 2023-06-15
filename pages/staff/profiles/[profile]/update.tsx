import Link from "next/link";
import { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import Textbox from "../../../../components/Textbox";
import {
  CheckCircleIcon,
  CheckIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";
import UserSuccessBox from "../../../../components/UserSuccessBox";
import Image from "next/image";
import useVerify from "../../../../hooks/useVerify";
import fileToBase64 from "../../../../helpers/fileToBase64";
import Profile from "../../../../api/profile";
import { useRouter } from "next/router";
import downloadImage from "../../../../helpers/downloadImage";
import ReusableFooter from "../../../../components/ReusableFooter";

declare type ErrorType = {
  adress: any;
  kind: any;
  picture64: any;
};

export default function UpdateProfile() {
  const router = useRouter()
  const inputRef = useRef<any>();
  const [address, setAddress] = useState('')
  const [sex, setSex] = useState("");
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [picture64, setPicture64] = useState<any>("");
  const [imageURL, setImageURL] = useState<string>("/placeholder.jpg");
  const [profile, setProfile] = useState<any>()
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await Profile.update(
      {
        kind: sex,
        adress: address,
        picture64,
      },
      profile.pk
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        kind: errors.kind && errors.kind[0],
        adress: errors.adress && errors.adress[0],
        picture64: errors.picture64 && errors.picture64[0],
      });
    } else if (result) {
      setShowSuccessBox(true);
    }
  };
  useVerify();
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
    const getProfile = useCallback(async (id: string) => {
      const result = await Profile.get(id);
      if (result) {
        setProfile(result);
        setAddress(result.adress)
        setSex(result.kind)
        setImageURL(result.picture)
        const img = await downloadImage(result.picture)
        const _img = await fileToBase64(img)
        setPicture64(_img)
      }
    }, []);
    useEffect(() => {
      if (router.isReady) {
        getProfile(router.query.profile as string);
      }
    }, [router, getProfile]);
  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="Voir plus"
        title="Modification effectuée"
        path="/staff/profiles/"
        message="Votre profile de compte a été modifié avec succès, vous pouvez maintenant le consulter."
      />
    );
  return (
    <>
      <ReusableHeader text="Modification du profil" />
      <div className="h-auto md:w-5/12  w-11/12 mx-auto flex items-center justify-center">
        <div className=" h-auto flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <FormHeader title="Modification du profil" />
            <small className="text-xs md:w-11/12 w-10/12 mx-auto text-gray-500  my-3">
              Modifier les informations du formulaire ci-bas en fin de mettre
              votre profil en jour
            </small>
          </div>
          <form className="w-full mx-auto mt-2">
            <div className="h-40  w-40 rounded-full border mx-auto mb-3 relative">
              <Image
                src={imageURL}
                width={"0"}
                height="0"
                className="w-full rounded-full h-full object-cover"
                sizes="100vw"
                alt="User's image placeholder"
              />
              <input onChange={loadImage} type="file" hidden ref={inputRef} />
              <span
                onClick={pickImage}
                className="absolute bottom-2 right-4 h-7 w-7 bg-blue-600 text-white rounded-full cursor-pointer grid place-items-center"
              >
                <PhotoIcon className="h-5 w-5" />
              </span>
            </div>
            {error?.picture64 && (
              <small className="text-red-500 text-sm">{error?.picture64}</small>
            )}
            <Textbox
              event={(e) => setAddress(e.target.value)}
              value={address as string}
              error={error && error.adress}
              name="address"
              type="text"
              placeholder="Addresse"
            />
            <div className="w-full flex mb-4 justify-center items-center relative bg-gray-100 rounded h-20">
              <span className="absolute text-gray-600 top-3 left-2">Sexe</span>
              <div className="flex w-full mt-6 justify-around">
                <span
                  onClick={() => setSexTo("Feminin")}
                  className={`${
                    sex === "Feminin"
                      ? "bg-blue-600 border-transparent text-white"
                      : "bg-white text-blue-600 border-blue-600"
                  } rounded-full border-2 border-blue-600 transition-colors duration-500  px-1.5 py-0.5 flex items-center`}
                >
                  Feminin{" "}
                  {sex === "Feminin" ? (
                    <CheckIcon className="h-4 ml-1 w-4" />
                  ) : null}
                </span>
                <span
                  onClick={() => setSexTo("Masculin")}
                  className={`${
                    sex === "Masculin"
                      ? "bg-blue-600 border-transparent text-white"
                      : "bg-white text-blue-600 border-blue-600"
                  } rounded-full border-2 border-blue-600 transition-colors duration-500  px-1.5 py-0.5 flex items-center`}
                >
                  Masculin{" "}
                  {sex === "Masculin" ? (
                    <CheckIcon className="h-4 w-4 ml-1" />
                  ) : null}
                </span>
              </div>
              {error?.kind && (
                <small className="text-red-500 absolute left-2 -bottom-6 text-sm">
                  {error?.kind}
                </small>
              )}
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
      <ReusableFooter />
    </>
  );
}
