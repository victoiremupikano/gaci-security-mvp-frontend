import { MouseEventHandler, useState } from "react";
import Button from "../../components/Button";
import FormHeader from "../../components/FormHeader";
import ReusableHeader from "../../components/ReusableHeader";
import Textbox from "../../components/Textbox";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import useForm from "../../hooks/useForm";
import user from "../../api/user";
import UserSuccessBox from "../../components/UserSuccessBox";
import ReusableFooter from "../../components/ReusableFooter";

declare type ErrorType = {
  names: any
  email: any
  phone_number: any
  password2: any
  password: any
};

export default function AddUser() {
    const [
      { password, names, email, phone_number, password2 },
      handleChange,
    ] = useForm({
      names: "",
      email: "",
      phone_number: "",
      password2:'',
      password: "",
    });
  const [error, setError] = useState<ErrorType>()
  const [showSuccessBox, setShowSuccessBox] = useState(false)
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
  const result = await user.addNoStaffUser({
    staff: "false",
    password,
    names,
    email,
    phone_number,
    password2,
  });
  if (result.type === "error") {
    const errors = result.data.errors
    setError({
      names:errors.names && errors.names[0],
      email: errors.email && errors.email[0],
      phone_number: errors.phone_number && errors.phone_number[0],
      password: errors.password && errors.password[0],
      password2: errors.password2 && errors.password2[0]
    })
  } else if (result.token) {
    const user = JSON.parse(result.data.user_auth)[0];
    localStorage.setItem("up_u", JSON.stringify(user))
    setShowSuccessBox(true)
  }
};

    
if (showSuccessBox)
  return <
    UserSuccessBox text="continer" 
    title="Inscription effectuée" 
    path="/auth/login" message="Votre compte a été créé avec succès, vous pouvez maintenant vous connecter sur le système."/>
  return (
    <>
      <ReusableHeader text="Nouvel utilisateur" />
      <div className="h-[600px] lg:w-5/12 md:w-8/12 md:mx-auto  w-11/12 mx-auto flex items-center justify-center">
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12 mx-auto">
             <FormHeader title="Nouvel utilisateur" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour céer un compte
              utilisateur.
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <Textbox
              event={handleChange}
              value={names as string}
              error={error && error.names}
              name="names"
              type="text"
              placeholder="Noms"
            />
            <Textbox
              event={handleChange}
              value={phone_number as string}
              error={error && error.phone_number}
              name="phone_number"
              type="tel"
              placeholder="Téléphone"
            />
            <Textbox
              event={handleChange}
              value={email as string}
              error={error && error.email}
              name="email"
              type="email"
              placeholder="Addresse Email"
            />
            <Textbox
              value={password as string}
              event={handleChange}
              error={error && error.password}
              name="password"
              type="password"
              placeholder="Votre mot de passe"
            />
            <Textbox
              event={handleChange}
              value={password2 as string}
              error={error && error.password2}
              name="password2"
              type="password"
              placeholder="Confirmer mot de passe"
            />
            <Button
              event={onClickRegister}
              size="fit"
              content={
                <div className="flex justify-around">
                  Enregister <CheckCircleIcon className="h-6 w-6 ml-3" />
                </div>
              }
              design="primary"
              type="button"
            />
          </form>
        </div>
      </div>
      <ReusableFooter />
    </>
  );
}
