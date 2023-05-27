import { AdjustmentsHorizontalIcon, ArrowLeftIcon, ArrowRightIcon, PencilIcon } from "@heroicons/react/20/solid"
import moment from "moment"
import "moment/locale/fr"
import Link from "next/link"
import { useEffect, useState } from "react"
import ClickableSpan from "../../../components/ClickableSpan"
import GoBack from "../../../components/GoBack"
import ReusableHeader from "../../../components/ReusableHeader"
import fetch from "../../../helpers/fetch"
import useVerify from "../../../hooks/useVerify"
import Pricing from "../../../api/pricing"

export default function Index() {
  const [fnx, setFnx] = useState<Array<any>>()
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    useVerify()
    const getFnx = async () => {
        const result = await Pricing.getAll()
        if (result.results) {
          setFnx(result.results);
          setNext(result?.next?.split("/mscm/settings")[1]);
          setPrevious(result?.previous?.split("/mscm/settings")[1]);
          setCount(result.count);
        }
  }
   const onClickNext = async () => {
     const result = await fetch(next);
     if (result.results) {
       setFnx(result.results);
       setNext(result?.next?.split("/mscm/settings")[1]);
       setPrevious(result?.previous?.split("/mscm/settings")[1]);
       setCount(result.count);
     }
   };
   const onClickPrev = async () => {
     const result = await fetch(previous);
     if (result.results) {
       setFnx(result.results);
       setNext(result?.next?.split("/mscm/settings")[1]);
       setPrevious(result?.previous?.split("/mscm/settings")[1]);
       setCount(result.count);
     }
   };
    useEffect(() => {
        getFnx()
    },[])
    return (
      <>
        <ReusableHeader text="Taux" />
        <div className="w-11/12 h-full mx-auto">
          <div className="flex justify-between w-full mt-4 mb-3">
            <div className="flex items-center">
              <GoBack />{" "}
              <span className="text-xl font-semibold">Liste des tarifications</span>
            </div>
            <Link
              className="p-1 text-white bg-blue-600 rounded"
              href={"/staff/pricing/add"}
            >
              Ajouter
            </Link>
          </div>
          <div className="flex justify-between p-1 font-semibold border-b">
            <span className="w-1/12">#</span>
            <span className="w-4/12 text-center">Adhésion/famille</span>
            <span className="w-4/12 text-center">Tranche</span>
            <span className="w-4/12 text-center">Adhésion/Organisat0</span>
            <span className="w-4/12 text-center">Tranche</span>
            <span className="w-3/12">Modif.</span>
            <span className="w-2/12 text-center">--</span>
          </div>
          {!loading ? (Array.isArray(fnx) && fnx.length > 0
            ? fnx.map((fn, index) => {
                return (
                  <div
                    key={fn.pk}
                    className={`flex justify-between ${
                      index % 2 === 0 ? "" : "bg-gray-200"
                    } p-1 w-full text-gray-600  items-center`}
                  >
                    <span className="w-1/12">{index + 1}</span>
                    <span className="w-4/12 text-center">{fn.adh_family}</span>
                    <span className="w-4/12 text-center">{fn.trh_family}</span>
                    <span className="w-4/12 text-center">{fn.adh_org}</span>
                    <span className="w-4/12 text-center">{fn.trh_org}</span>
                    <span className="w-3/12 text-sm">
                      {moment(fn.date_update).format("ll")}
                    </span>
                    <span className="flex justify-around space-x-1 w-2/12">
                      <Link
                        href={"/staff/pricing/" + fn.pk + "/update"}
                        className="grid text-white bg-gray-700 rounded h-7 w-7 place-items-center"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Link>
                      <Link
                        href={"/staff/pricing/" + fn.pk}
                        className="grid text-white bg-gray-700 rounded h-7 w-7 place-items-center"
                      >
                        <AdjustmentsHorizontalIcon className="w-5 h-5" />
                      </Link>
                    </span>
                  </div>
                );
              })
            : "No data") : <div className="flex items-center justify-center">
              Loading...</div>}
          <div
            className="flex justify-around w-11/12 mx-auto mt-4 md:w-4/12"
          >
            {previous && (
              <ClickableSpan onClick={onClickPrev}>
                <ArrowLeftIcon className="w-5 h-5 ml-1" /> Precedent
              </ClickableSpan>
            )}
            {next && (
              <ClickableSpan onClick={onClickNext}>
                Suivant <ArrowRightIcon className="w-5 h-5 ml-1" />
              </ClickableSpan>
            )}
          </div>
        </div>
      </>
    );
}