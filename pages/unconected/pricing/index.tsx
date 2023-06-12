import React, { MouseEventHandler, useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader";
import GoBack from "../../../components/GoBack";
import { useRouter } from "next/router";
import uppercaseFirst from "../../../helpers/uppercaseFirst";
import moment from "moment";
import Link from "next/link";
import "moment/locale/fr";
import Pricing from "../../../api/pricing";
import { XMarkIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Toast from "../../../components/Toast";

export default function ActivePricing() {
  const [pricing, setPricing] = useState<any>({});
  const getPricing = async () => {
    const result = await Pricing.getActive();
    if (result.pk) {
      setPricing(result);
    }
  };

  return (
    <>
      <ReusableHeader text="Une tarification active" />
      <section className='container mx-auto md:px-2 py-16 w-1/2'>
        <div className='flex justify-center'>
          { author ? <Author {...author}></Author> : <></>}
                </div>

                <div className="post py-10">
                    <h1 className='font-bold text-4xl text-center pb-5'>{title || "No Title"}</h1>

                    <p className='text-gray-500 text-xl text-center'>{subtitle || "No Title"}</p>

                    <div className="py-10">
                        <Image src={img || "/"} width={900} height={600}></Image>
                    </div>

                    <div className="content text-gray-600 text-lg flex flex-col gap-4">
                        {description || "No Description"}
                    </div>

                </div>  

                <Ralated></Ralated>
            </section>
    </>
  );
}
