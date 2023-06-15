import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { FunctionComponent } from "react";
import PostImages from "../api/postImages";
import React, { MouseEventHandler, useEffect, useState } from "react";
import ButtonNewsLetter from "./ButtonNewsLetter";
import TextboxNewsLetter from "./TextboxNewsLetter";
import useForm from "../hooks/useForm";
import Nl from "../api/newsLetter";
import Toast from "./Toast";
import UserSuccessBox from "./UserSuccessBox";

declare type ErrorType = {
  email: any;
};

const NewsLetter: FunctionComponent = () => {
  const [{ email }, handleChange] = useForm({
    email: "",
  });
  const [error, setError] = useState<ErrorType>();
  const [status, setStatus] = useState(true);
  const [entreprize, setEntreprize] = useState("");

  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const result = await Nl.addNoStaff(
      {
        entreprize_id: entreprize,
        email: email,
        status,
      },
      entreprize
    );
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        email: errors.email && errors.email[0],
      });
      if (result.data.errors.non_field_errors) {
        setError({
          email: result.data.errors.non_field_errors,
        });
      }
      else if (result.data.errors.detail) {
        setError({
          email: result.data.errors.detail,
        });
      }
    } else if (result.pk) {
      setError({
        email: "Votre abonnement à la newsletter éffectuer avec avec succès, vous recevrez maintenant nos email quotidient.",
      });
    }
  };
  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize");
    setEntreprize(entreprize as string);
  }, []);
  return (
    <section className="bg-gray-50 mt-20">
      <div className="container mx-auto md:px-20 py-16 text-center">
        <h1 className="font-bold text-3xl">Abonnez-vous à notre Newsletter</h1>

        <TextboxNewsLetter
          event={handleChange}
          value={email as string}
          error={error && error.email}
          name="email"
          type="email"
          placeholder="Entrer votre adresse mail"
        />
        <ButtonNewsLetter
              event={onClickRegister}
              size="fit"
              content="Abonnement"
              design="primary"
              type="button"
            />
      </div>
    </section>
  );
};

export default NewsLetter;
