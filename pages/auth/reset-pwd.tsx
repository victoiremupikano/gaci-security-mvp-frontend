import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import user from "../../api/user";
import Button from "../../components/Button";
import ReusableHeader from "../../components/ReusableHeader";
import Textbox from "../../components/Textbox";
import useForm from "../../hooks/useForm";

export default function ResetPassword() {
  const [{ email }, handleChange] = useForm({ email: "" })
  const [showSendMailStatus, setShowSendMailStatus] = useState(false)
  const onClickLogin: MouseEventHandler<HTMLButtonElement> = async(e) => {
    const result = await user.resetPassword(email.toString())
  };

  return (
    <>
      <ReusableHeader text="Réinitiailiser mot de passe" />
      <div className="h-[500px]  w-full flex items-center justify-center">
        <div className="border h-[250px] flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <span className="text-blue-600 mt-4 font-semibold text-lg text-center">
              Réinitialisation du mot de passe
            </span>
            <small className="text-xs w-10/12 mx-auto text-gray-500 text-center my-3">
              Entrez l&apos;addresse mail que vous utilisez dans le champs ci-bas pour que nous envoyons le mail de réinitialisation
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <Textbox
              value={email as string}
              event={handleChange}
              error=""
              name="email"
              type="email"
              placeholder="Votre addresse mail"
            />            
            <div className="flex items-center justify-between">  
                <Link className="text-blue-600 font-semibold" href="/auth/login">Connexion</Link>
                <Button
                event={onClickLogin}
                size="fit"
                content="Envoyer le mail"
                design="primary"
                type="button"/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
