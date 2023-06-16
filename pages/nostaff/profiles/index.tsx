import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import User from "../../../api/user";
import {
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import GoBack from "../../../components/GoBack";
import moment from "moment";
import "moment/locale/fr";
import uppercaseFirst from "../../../helpers/uppercaseFirst";
import Link from "next/link";
import useVerify from "../../../hooks/useVerify";
import Profile from "../../../api/profile";
import Toast from "../../../components/Toast";
import ReusableHeader from "../../../components/ReusableHeader";
import ReusableFooter from "../../../components/ReusableFooter";

moment.locale("fr");

export default function IndexProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<{ [key: string]: any }>({});
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  useVerify();

  const getUser = useCallback(async (id: string) => {
    const result = await Profile.getUserLogged();
    if (result) {
      setProfile(result.results[0]);
    }
  }, []);
  useEffect(() => {
    if (router.isReady) {
      getUser(router.query.profile as string);
    }
  }, [router, getUser]);
  const onClickDeleteProfile = async () => {
    setToast("hide");
    const result = await Profile.delete(profile.pk);
    if (result.type === "error") {
      setToast("show");
      setMsg(result.data.detail);
    } else {
      router.push("/nostaff/profile");
    }
  };
  return (
    <>
      <ReusableHeader text=" Profil de l'utilisateur" />
      <div className="mt-10 h-full mb-3 overflow-hidden relative  w-11/12 md:w-6/12 mx-auto">
        <Toast message={msg} set={toast} />
        <div className="w-full mb-4 justify-between flex items-center mx-auto">
          <div className="flex items-center">
            <GoBack />{" "}
            <span className="font-semibold">Profile de l&apos;utilisateur</span>
          </div>
          {/* debut de la condition */}
          {profile ? (
            <Link
              href={"/nostaff/profiles/" + profile.pk + "/update"}
              className="bg-blue-600 rounded p-1 text-white font-semibold"
            >
              Modifier
            </Link>
          ) : (
            <Link
              href={"/nostaff/profiles/add"}
              className="bg-blue-600 rounded p-1 text-white font-semibold"
            >
              Ajouter
            </Link>
          )}
        </div>
        {profile ? (
          <div>
            <div className="h-100 rounded-lg mb-3 overflow-hidden mx-auto  w-56">
              <Image
                priority
                className="w-full h-full object-cover"
                sizes="100vw"
                src={profile.picture || "/placeholder.jpg"}
                alt={
                  (profile.user && profile.user?.names) ||
                  "Person's" + "'s profile image"
                }
                height="0"
                width="0"
              />
            </div>
            <div className=" w-full p-1 flex-col flex ">
              <div className="flex justify-between mb-3">
                <span>Noms</span>
                <span className="font-semibold">
                  {uppercaseFirst(profile.user && profile.user?.names) ||
                    "Pas de donnée"}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span>Téléphone</span>
                <span className="font-semibold">
                  {profile.user?.phone_number || "Non donné"}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span>Email</span>
                <span className="font-semibold">
                  {profile.user?.email || "Non donnée"}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span>Utilisateur</span>
                <span className="font-semibold">
                  {profile.user?.names || "Non donnée"}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span>Sexe</span>
                <span className="font-semibold">
                  {uppercaseFirst(profile.kind) || "Non Precisé"}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span>Adresse</span>
                <span className="font-semibold">
                  {uppercaseFirst(profile.adress) || "Non Precisé"}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span>Date de création</span>
                <span className="font-semibold">
                  {moment(profile.date_add).format("ll")}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span>Dernière modification</span>
                <span className="font-semibold">
                  {moment(profile.date_add).fromNow()}
                </span>
              </div>
              <div className="flex  mb-3">
                <span
                  onClick={onClickDeleteProfile}
                  className="bg-red-600 flex items-center cursor-pointer hover:bg-red-700 py-1.5 text-white px-2  rounded"
                >
                  Supprimer le profil de{" "}
                  <span className="font-semibold ml-1">
                    {profile.user?.names}
                  </span>{" "}
                  <XMarkIcon className="w-5 h-5 ml-2" />
                </span>
              </div>
            </div>
          </div>
        ) : (
          "No data"
        )}
      </div>
      <ReusableFooter />
    </>
  );
}
