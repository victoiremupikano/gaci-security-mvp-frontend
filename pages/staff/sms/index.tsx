import { AdjustmentsHorizontalIcon, ArrowLeftIcon, ArrowRightIcon, EyeIcon, PencilIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import "moment/locale/fr";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sms from "../../../api/sms";
import ClickableSpan from "../../../components/ClickableSpan";
import GoBack from "../../../components/GoBack";
import ReusableHeader from "../../../components/ReusableHeader";
import fetch from "../../../helpers/fetch";
import useVerify from "../../../hooks/useVerify";

export default function Index() {
  const [sms, setSms] = useState<Array<any>>();
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const [count, setCount] = useState()
  const [loading, setLoading] = useState(false)
  useVerify();
  const getSms = async (entreprizeId: string) => {
    setLoading(true)
      const result = await Sms.getAll(entreprizeId);
      if (result.results) {
        setSms(result.results);
        setNext(result?.next?.split("/share_param")[1] as string);
        setPrevious(result?.previous?.split("/share_param")[1] as string);
        setCount(result.count);
    }
    setLoading(false)
    }
  const onClickNext = async () => {
     setLoading(true)
     const result = await fetch(next, 'share_param');
     if (result.results) {
       setSms(result.results);
       setNext(result?.next?.split("/share_param")[1]);
       setPrevious(result?.previous?.split("/share_param")[1]);
       setCount(result.count);
    }
    setLoading(false)
   };
  const onClickPrev = async () => {
     setLoading(true)
     const result = await fetch(previous, "share_param");
     if (result.results) {
       setSms(result.results);
       setNext(result?.next?.split("/share_param")[1]);
       setPrevious(result?.previous?.split("/share_param")[1]);
       setCount(result.count);
    }
    setLoading(false)
   };
  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize")
    getSms(entreprize as string);
  }, []);
  return (
    <>
      <ReusableHeader text="Toutes les messages enregistrer" />
      <div className="w-11/12 mx-auto h-full">
        <div className="w-full mb-3 mt-4 flex justify-between">
          <div className="flex items-center">
            <GoBack />{" "}
            <span className="font-semibold text-xl">Toutes les messages enregistrer</span>
          </div>
          <div className="flex justify-around">
            <span className="flex p-1 rounded font-semibold mr-1 text-gray-800 bg-gray-100">Total : {count}</span>
            <Link
              className="bg-blue-600 text-white rounded p-1"
              href={"/staff/sms/add_api"}
            >
              API
            </Link>
            <Link
              className="bg-blue-600 text-white rounded p-1"
              href={"/staff/sms/add_gsm"}
            >
              GSM
            </Link>
          </div>
        </div>
        <div className="flex justify-between border-b text-sm p-1 font-semibold">
          <span className="w-fit">#</span>
          <span className="w-2/12 text-center">Message</span>
          <span className="w-2/12 text-center">Source</span>
          <span className="w-2/12 text-center">Ip</span>
          <span className="w-2/12  md:flex hidden">Modif.</span>
          <span className="w-2/12 md:flex hidden">Date d&apos;ajout.</span>
          <span className="w-1/12">--</span>
        </div>
        {!loading ? (
          Array.isArray(sms) && sms.length > 0 ? (
            sms.map((a, index) => {
              return (
                <div
                  key={a.pk}
                  className={`flex justify-between ${
                    index % 2 === 0 ? "" : "bg-gray-200"
                  } p-1 w-full text-gray-600  items-center`}
                >
                  <span className="w-fit">{index + 1}</span>
                  <span className="md:w-2/12 text-center">{a.message}...</span>
                  <span className="md:w-2/12 text-center">{a.source}...</span>
                  <span className="md:w-2/12 text-center">{a.ip}...</span>
                  <span className="w-2/12  md:flex hidden text-sm">
                    {moment(a.date_update).fromNow()}
                  </span>
                  <span className="w-2/12  md:flex hidden text-sm">
                    {moment(a.date_add).format("ll")}
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
