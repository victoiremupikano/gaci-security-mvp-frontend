import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import user from "../../api/user";
import Button from "../../components/Button";
import ReusableHeader from "../../components/ReusableHeader";
import Textbox from "../../components/Textbox";
import Toast from "../../components/Toast";
import useForm from "../../hooks/useForm";


declare type ErrorType = {
  email: any;
  password: any;
};

export default function Login() {
  const [{ email, password }, handleChange] = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState<ErrorType>();
  const router = useRouter();
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setToast("hide")
    const result = await user.login(email as string, password as string);
    if (result.type === "error") {
      const errors = result.data.errors
      setError({
        email:errors.email &&errors.email[0],
        password:errors.password2 &&errors.password[0],
      });
      if (errors.non_field_errors) {
        setToast('show')
        setMsg(errors.non_field_errors);
      }
    } else if (result.token) {
      if (result.token) {
        const data = result.data;
        localStorage.setItem("access_token", "Bearer " + result.token.access);
        localStorage.setItem("refresh_token", "Bearer " + result.token.refresh);
        // les user_auth_data
        const user_auth = JSON.parse(data.user_auth)[0]

        localStorage.setItem("user_data",
         JSON.stringify({...user_auth})
        );
        // on place les ids
        if (JSON.parse(data.user_auth)[0]) {
          // on enregistre le staff
          const staff = JSON.parse(data.user_auth)[0].fields?.staff;
          localStorage.setItem("staff", staff);
          
          // on route les utilisateurs
          const s = JSON.parse(localStorage.getItem("staff") as string);
          s == true
            ? router.push("/staff/dashboard")
            : router.push("/nostaff/dashboard");
        } 
      }
    }
  };

  return (
    <>
      <ReusableHeader text="Connexion" />
      <div className="h-full w-full md:w-8/12 relative lg:w-5/12 md:mx-auto flex justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-[360px] mt-32 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <span className="text-blue-600 mt-4 font-semibold text-lg text-center">
              Connexion
            </span>
            <small className="text-xs w-10/12 mx-auto text-gray-500 text-center my-3">
              Entrez vos identifiant dans le formulaire ci-bas pour vous
              connecter.{" "}
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <Textbox
              value={email as string}
              event={handleChange}
              error={error && error.email}
              name="email"
              type="email"
              placeholder="Votre e-mail"
            />
            <Textbox
              value={password as string}
              event={handleChange}
              error={error && error.password}
              name="password"
              type="password"
              placeholder="Votre mot de passe"
            />
            <div className="mb-2 text-sm text-gray-500">
              Avez-vous pas un compte ?{" "}
              <Link
                href="/auth/add"
                className="text-blue-600 font-semibold"
              >
                Créér un compte
              </Link>
            </div>
            <div className="mb-2 text-sm text-gray-500">
              Mot de passe oublier ?{" "}
              <Link
                href="/auth/reset-pwd"
                className="text-blue-600 font-semibold"
              >
                Réinitialiser
              </Link>
            </div>
            <Button
              event={onClickLogin}
              size="fit"
              content="Connexion"
              design="primary"
              type="button"
            />
          </form>
        </div>
      </div>
    </>
  );
}
