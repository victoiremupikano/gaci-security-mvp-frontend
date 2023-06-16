import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import User from "../../../../api/user";
import {
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/20/solid";
import Image from "next/image";
import GoBack from "../../../../components/GoBack";
import moment from "moment";
import "moment/locale/fr";
import uppercaseFirst from "../../../../helpers/uppercaseFirst";
import useVerify from "../../../../hooks/useVerify";
import Toast from "../../../../components/Toast";
import DetailCardHolder from "../../../../components/DetailCardHolder";
import ReusableHeader from "../../../../components/ReusableHeader";
import ChangeStatusButton from "../../../../components/ChangeStatusButton";

moment.locale("fr");

export default function UniqueUser() {
  const router = useRouter();
  const [user, setUser] = useState<{ [key: string]: any }>({});
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [type_, setType] = useState<"failure" | "success">("success");
  const [msg, setMsg] = useState("");
  useVerify();
  const getUser = useCallback(async (id: string) => {
    const result = await User.get(id);
    if (result.pk) {
      setUser(result);
    }
  }, []);
  const changeUserStatus = async () => {
    setToast("hide");
    const result = await User.changeStatus({
      user_id: user.pk,
      is_active: !user.is_active,
    });
    if (result.msg) {
      setToast("show");
      setMsg(result.msg);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getUser(router.query.user as string);
    }
  }, [router, getUser, toast]);
  return (
    <>
      <ReusableHeader text="Profile de l'utilisateur" />
      <div className="h-full mt-10  mb-3 relative  w-11/12 mx-auto lg:w-6/12  md:w-8/12">
        <Toast message={msg} type={type_} set={toast} />
        <div className="w-full mb-4 flex justify-between items-center mx-auto">
          <div className="flex items-center">
            <GoBack />{" "}
            <span className="font-semibold">Profile de l&apos;utilisateur</span>
          </div>
        </div>
        <div className="h-56 rounded-lg mb-3 overflow-hidden mx-auto  w-56">
          <Image
            priority
            className="w-full h-full object-cover"
            sizes="100vw"
            src={"/placeholder.jpg"}
            alt={(user.agent && user.names) || "Agge's" + "'s profile image"}
            height="0"
            width="0"
          />
        </div>
        <div className=" w-full p-1 flex-col flex ">
          <DetailCardHolder
            target="Noms"
            value={uppercaseFirst(user && user.names)}
          />
          <DetailCardHolder target="Téléphone" value={user.phone_number} />
          <DetailCardHolder target="Email" value={user.email} />
          <div className="flex justify-between mb-3">
            <span>Membre du staff</span>
            <span className="bg-gray-600 flex items-center w-fit rounded-full py-0.5 font-semibold px-1 text-sm text-white">
              {user.staff ? "Oui" : "Non"}
              {user.staff ? (
                <CheckCircleIcon className="h-4 w-4 ml-1" />
              ) : (
                <XCircleIcon className="h-4 w-4 ml-1" />
              )}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Actif(ve)</span>
            <span
              className={` ${
                user.is_active ? "bg-blue-600" : "bg-red-600"
              } flex items-center w-fit rounded-full py-0.5 font-semibold px-1 text-sm text-white`}
            >
              {user.is_active ? "Oui" : "Non"}
              {user.is_active ? (
                <CheckCircleIcon className="h-4 w-4 ml-1" />
              ) : (
                <XCircleIcon className="h-4 w-4 ml-1" />
              )}
            </span>
          </div>
          <DetailCardHolder
            target="Date de création"
            value={moment(user.date_add).format("ll")}
          />
          <DetailCardHolder
            target="Dernière modification"
            value={moment(user.date_add).fromNow()}
          />
          <div className="flex justify-between mt-5">
            <ChangeStatusButton
              onChangeStatus={changeUserStatus}
              status={user?.is_active}
            />
          </div>
        </div>
      </div>
    </>
  );
}
