import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { FunctionComponent } from "react";
import PostImages from "../api/postImages";
import React, { MouseEventHandler, useEffect, useState } from "react";
import Button from "./Button";
import Textbox from "./Textbox";
import useForm from "../hooks/useForm";
import NewsLetter from "../api/newsLetter";

declare type ErrorType = {
  email: any;
};

const PostPubUniqueImagesModel: FunctionComponent = () => {
  const [{email},handleChange,
  ] = useForm({
    email: ""
  });
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [status, setStatus] = useState(true)
  const [entreprize, setEntreprize] = useState("")
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await NewsLetter.add({
      entreprize_id:entreprize,
      email: email,
      status,
    }, entreprize);
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        email: errors.email && errors.email[0]
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };
  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize")
    setEntreprize(entreprize as string)
  },[])

  return (
    <section className="bg-gray-50 mt-20">
      <div className="container mx-auto md:px-20 py-16 text-center">
        <h1 className="font-bold text-3xl">Abonnez-vous à notre Newsletter</h1>

        <div className="py-4">
          <Textbox
                event={handleChange}
                value={email as string}
                error={error && error.email}
                name="email"
                type="email"
                placeholder="Entrer votre adresse mail"
              />
        </div>

        <button className="bg-orange-400 px-20 py-3 rounded-full text-gray-50 text-xl">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default PostPubUniqueImagesModel;
