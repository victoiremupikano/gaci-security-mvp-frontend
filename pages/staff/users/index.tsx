import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/20/solid";
import moment from "moment";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import user from "../../../api/user";
import GoBack from "../../../components/GoBack";
import ReusableHeader from "../../../components/ReusableHeader";
import UserCardAdmin from "../../../components/UserCardAdmin";
import useVerify from "../../../hooks/useVerify";
import "moment/locale/fr";

export default function IndexUsers() {
  const [users, setUsers] = useState<Array<any>>([]);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useVerify();

  const getUsers = useCallback(async () => {
    setLoading(true);
    const result = await user.getAll();
    if (result.results) {
      setUsers(result.results);
      setNext(result.next);
      setPrevious(result.previous);
      setCount(result.results.length);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <>
      <ReusableHeader text="Liste des agents" />
      <div className="w-[95%] mx-auto flex flex-col items-center h-full">
        <div className="w-full  mb-4 flex justify-between items-center mx-auto">
          <div className="flex">
            <GoBack />{" "}
            <span className="font-semibold">Liste des utilisateurs</span>
          </div>
          <div className="flex">
            <span className="font-semibold mr-2 bg-gray-100 h-fit p-1 rounded w-fit">
              Total : {count}
            </span>
            <Link
              href="/staff/users/add"
              className="text-white bg-blue-600 rounded p-1"
            >
              Ajouter
            </Link>
          </div>
        </div>
        <div className="w-full p-2 border-b mb-2 font-semibold text-gray-700 lg:text-base text-sm hidden md:flex justify-between">
          <span className="w-[5%]">#</span>
          <span className="w-[20%]">Noms</span>
          <span className="w-[20%]">Email</span>
          <span className="w-[20%] hidden lg:flex">Téléphone</span>
          <span className="w-[7.5%] flex">Status</span>
          <span className="w-[7.5%]">Staff</span>
          <span className="w-[10%]">Modif.</span>
          <span className="w-[10%] flex justify-center">--</span>
        </div>
        <div className="w-full flex flex-col lg:text-base text-sm  md:justify-between">
          {!loading ? (
            Array.isArray(users) && users.length > 0 ? (
              users.map((u) => (
                <div key={u.pk}>
                  <UserCardAdmin toAdmin user={u} />
                  <div
                    className={`w-full ${
                      users.indexOf(u) % 2 != 0 ? "bg-gray-200" : ""
                    } p-2 mb-2  text-gray-700  md:flex hidden space-x-1 justify-between`}
                  >
                    <span className="w-[5%]">{users.indexOf(u) + 1}</span>
                    <span
                      title={u?.names}
                      className="w-[20%] text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {u?.names}
                    </span>
                    <span
                      title={u?.email}
                      className="w-[20%] text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {u?.email}
                    </span>
                    <span className="w-[20%] hidden lg:flex">
                      {u?.phone_number}
                    </span>
                    <span className="w-[7.5%]">
                      {u?.is_active ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      ) : (
                        <NoSymbolIcon className="w-5 h-5 text-red-600" />
                      )}
                    </span>
                    <span
                      className={`w-[7.5%] font-semibold ${
                        u.staff ? "text-green-600" : ""
                      }`}
                    >
                      {u?.staff ? "Oui" : "Non"}
                    </span>
                    <span className="w-[10%]">
                      {moment(u?.date_update).fromNow(true)}.
                    </span>
                    <span className="w-[10%] flex justify-center">
                      <Link
                        className="w-7 h-7 grid place-items-center text-white bg-gray-700 rounded"
                        href={"/staff/users/" + u.pk}
                      >
                        <AdjustmentsHorizontalIcon className="h-5 w-5" />
                      </Link>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              "No data"
            )
          ) : (
            <div
              className="w-full flex
             justify-center items-center"
            >
              Loading...
            </div>
          )}
        </div>
        <div className="md:w-4/12 w-11/12 mx-auto flex justify-around mt-4">
          {previous && (
            <span className="text-white bg-blue-600 flex items-center justify-around p-1 rounded">
              <ArrowLeftIcon className="h-5 w-5" /> Précedent
            </span>
          )}
          {next && (
            <span className="text-white bg-blue-600 flex items-center justify-around p-1 rounded">
              Suivant <ArrowRightIcon className="h-5 w-5" />
            </span>
          )}
        </div>
      </div>
    </>
  );
}
