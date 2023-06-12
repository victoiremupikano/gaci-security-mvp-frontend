import React, { MouseEventHandler, useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader";
import GoBack from "../../../components/GoBack";
import Author from "../../../components/Author"
import { useRouter } from "next/router";
import uppercaseFirst from "../../../helpers/uppercaseFirst";
import moment from "moment";
import Link from "next/link";
import "moment/locale/fr";
import Pricing from "../../../api/pricing";
import Profile from "../../../api/profile";
import { XMarkIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Toast from "../../../components/Toast";

export default function ActivePricing() {
  const [pricing, setPricing] = useState<any>({});
  const [profile, setProfile] = useState<any>({});
  const getPricing = async () => {
    const result = await Pricing.getActive();
    if (result.pk) {
      setPricing(result);
      // on charge le profile de l'utilisateur trouver
      getProfile(pricing?.user?.pk)
    }
  };
  const getProfile = async (user_id: string) => {
    const result = await Profile.getUser_id(user_id);
    if (result.pk) {
      setProfile(result);
      console.log(profile)
    }
  };
  useEffect(() => {
    getPricing();
  }, []);

  return (
    <>
      <ReusableHeader text="Une tarification active" />
      {/* <section className='container mx-auto md:px-2 py-16 w-1/2'>
        <div className='flex justify-center'>
          { pricing?.user ? <Author {...pricing?.user?.names, pricing?.user?.email, pricing?.user?.names}></Author> : <></>}
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
            </section> */}
    </>
  );
}
