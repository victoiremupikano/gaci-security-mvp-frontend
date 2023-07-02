import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import moment from "moment";
import "moment/locale/fr";
import Link from "next/link";
import { useEffect, useState } from "react";
import Wtr from "../../../api/wtr";
import ClickableSpan from "../../../components/ClickableSpan";
import GoBack from "../../../components/GoBack";
import ReusableHeader from "../../../components/ReusableHeader";
import fetch from "../../../helpers/fetch";
import useVerify from "../../../hooks/useVerify";

export default function Index() {
  const [wtrs, setWtrs] = useState<Array<any>>();
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  useVerify();
  const getWtrs = async () => {
    setLoading(true);
    const result = await Wtr.getAll();
    if (result.results) {
      setWtrs(result.results);
      setNext(result?.next?.split("/security-data")[1] as string);
      setPrevious(result?.previous?.split("/security-data")[1] as string);
      setCount(result.count);
    }
    setLoading(false);
  };
  const onClickNext = async () => {
    setLoading(true);
    const result = await fetch(next, "security-data");
    if (result.results) {
      setWtrs(result.results);
      setNext(result?.next?.split("/security-data")[1]);
      setPrevious(result?.previous?.split("/security-data")[1]);
      setCount(result.count);
    }
    setLoading(false);
  };
  const onClickPrev = async () => {
    setLoading(true);
    const result = await fetch(previous, "security-data");
    if (result.results) {
      setWtrs(result.results);
      setNext(result?.next?.split("/security-data")[1]);
      setPrevious(result?.previous?.split("/security-data")[1]);
      setCount(result.count);
    }
    setLoading(false);
  };
  useEffect(() => {
    getWtrs();
  }, []);
  return (
    <>
      <ReusableHeader text="Toutes les envies de recherche" />
      <div className="w-11/12 mx-auto h-full">
        <div className="w-full mb-3 mt-4 flex justify-between">
          <div className="flex items-center">
            <GoBack />{" "}
            <span className="font-semibold text-xl">Toutes les envies de recherche</span>
          </div>
          <div className="flex justify-around">
            <span className="flex p-1 rounded font-semibold mr-1 text-gray-800 bg-gray-100">
              Total : {count}
            </span>
            <Link
              className="bg-blue-600 text-white rounded p-1"
              href={"/staff/wtr/add"}
            >
              Ajouter
            </Link>
          </div>
        </div>
        <div className="flex justify-between border-b text-sm p-1 font-semibold">
          <span className="w-fit">#</span>
          <span className="w-2/12 text-center">Noms</span>
          <span className="w-2/12 text-center">Genre</span>
          <span className="w-2/12 text-center">Utilisateur</span>
          <span className="w-2/12  md:flex hidden">Modif.</span>
          <span className="w-2/12 md:flex hidden">Date d&apos;ajout.</span>
          <span className="md:w-2/12 text-center  w-3/12">
            Date d&apos;emission
          </span>
          <span className="w-1/12">--</span>
        </div>
        {!loading ? (
          Array.isArray(wtrs) && wtrs.length > 0 ? (
            wtrs.map((a, index) => {
              return (
                <div
                  key={a.pk}
                  className={`flex justify-between ${
                    index % 2 === 0 ? "" : "bg-gray-200"
                  } p-1 w-full text-gray-600  items-center`}
                >
                  <span className="w-fit">{index + 1}</span>
                  <span className="md:w-2/12 text-center">
                    {a.names.substr(0, 16)}...
                  </span>
                  <span className="md:w-2/12 text-center">
                    {a.kind}...
                  </span>
                  <span className="w-2/12 text-center">{a.user.names}</span>
                  <span className="w-2/12  md:flex hidden text-sm">
                    {moment(a.date_update).fromNow()}
                  </span>
                  <span className="w-2/12  md:flex hidden text-sm">
                    {moment(a.date_add).format("ll")}
                  </span>
                  <span className="md:w-2/12  text-center w-3/12 text-sm">
                    {moment(a.date_emitted).format("ll")}
                  </span>
                  <span className="md:w-1/12 w-2/12 flex justify-around">
                    <Link
                      href={"/staff/wtr/" + a.pk + "/update"}
                      className="grid h-7 w-7 place-items-center text-white rounded bg-gray-700"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>
                    <Link
                      href={"/staff/wtr/" + a.pk}
                      className="grid h-7 w-7 place-items-center text-white rounded bg-gray-700"
                    >
                      <AdjustmentsHorizontalIcon className="w-5 h-5" />
                    </Link>
                  </span>
                </div>
              );
            })
          ) : (
            "No data"
          )
        ) : (
          <div className="flex h-40 w-full font-semibold  items-center justify-center">
            Loading...
          </div>
        )}
        <div className="md:w-4/12 w-11/12 mx-auto flex justify-around mt-4">
          {previous && (
            <ClickableSpan onClick={onClickPrev}>
              <ArrowLeftIcon className="h-5 w-5 mr-1" /> Precedent
            </ClickableSpan>
          )}
          {next && (
            <ClickableSpan onClick={onClickNext}>
              Suivant <ArrowRightIcon className="h-5 w-5 ml-1" />
            </ClickableSpan>
          )}
        </div>
      </div>
    </>
  );
}
