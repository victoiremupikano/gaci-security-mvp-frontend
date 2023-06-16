import {
  EnvelopeIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import "moment/locale/fr";

declare type Props = {
  user: Record<string, any>;
  toAdmin?: boolean;
};

export default function ProfileCardAdmin({ user, toAdmin }: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        toAdmin
          ? router.push("/admin/profiles/" + user.pk)
          : router.push("/staff/profiles/" + user.pk)
      }
      className="h-32 items-center flex md:hidden space-x-2 p-1   mb-3 cursor-pointer hover:shadow-xl overflow-hidden rounded shadow md:w-80 w-full"
    >
      <div className="h-20  overflow-hidden w-20 rounded-full">
        <Image
          className="w-full h-full object-cover"
          sizes="100vw"
          src={user.picture || "/placeholder.jpg"}
          alt={user.agent.names}
          height="0"
          width="0"
        />
      </div>
      <div className=" w-[calc(100%-80px)] text-gray-700 p-1  flex-col justify-between flex h-[90%]">
        <div className="flex flex-col">
          <span className="flex items-center">
            <UserIcon className="mr-1 h-5 w-5 " />
            {user.agent.names}
          </span>
          <span className="flex items-center">
            <EnvelopeIcon className="mr-1 h-5 w-5 " />
            {user.agent.email}
          </span>
          <span className="flex items-center">
            <MapPinIcon className="mr-1 h-5 w-5 " />
            {user.adress}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-center flex justify-center items-center  font-semibold text-sm text-gray-700">
            {moment(user.date_update).fromNow(true)}
          </span>
          <span className="bg-gray-700 rounded-full w-6 h-6 text-center flex justify-center items-center  font-semibold text-sm text-white">
            {user.kind === "masculin" ? "M" : user.kind == "feminin" ? "F" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
