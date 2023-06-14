import Image from "next/image";
import Link from "next/link";
import {FunctionComponent} from "react"
import Profile from "../api/profile";
import React, { MouseEventHandler, useEffect, useState } from "react";

type Props = {
  index? : any
  user : any
}
const Author: FunctionComponent<Props> = ({index, user}) => {
  const [profile, setProfile] = useState<any>({});
  const getProfile = async (user_id: string) => {
    const result = await Profile.getUser_id(user_id);
    if (result.pk) {
      setProfile(result);
    }
  };
  // on charge le profile
  useEffect(() => {
    if(user){
      getProfile(user)
    }
  }, [user]);
  
  if(!user) return <></>;

  return (
    <div className="author flex py-5">
      <Image
        className="rounded-full"
        sizes="100vw"
        src={profile.picture || '/placeholder.jpg'}
        alt="img author"
        height={60}
        width={45}
      />     
      <div className="flex flex-col justify-center px-4">
        <Link href={"#"} className="text-md font-bold text-gray-800 hover:text-gray-600">{profile?.user?.names || "No Names"}</Link>
        <span className="text-sm text-gray-500">{profile?.user?.email || "No email"}</span>
      </div>
    </div>
  );
}

export default Author
