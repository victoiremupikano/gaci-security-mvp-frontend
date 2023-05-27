import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import ReusableHeader from "../components/ReusableHeader";

export default function PageNotFound() {
    const router = useRouter()
    return (
        <>
        <ReusableHeader text="404 - Page not found" />
        <div className="w-full h-[80%]">
        <div className="w-11/12 md:w-8/12 md:justify-between  md:mt-12 mx-auto h-full md:h-80 md:border rounded flex flex-col md:flex-row">
          <div className="md:w-5/12">
            <h1 className="text-blue-600 my-4 text-xl font-semibold text-center">
              500 Error - Server error page
            </h1>
          <div className="h-72 w-72 mx-auto">
            <Image
              src="/500.png"
              width={"0"}
              height="0"
              className="w-full rounded-full h-full object-cover"
              sizes="100vw"
              alt="Page not found illustration by storyset.com"
            />
          </div>
          </div>
          <div className=" flex md:w-7/12 flex-col justify-center p-2">
            <p className="font-semibold ">
              La page que vous essayez de visiter est introuvable pour le moment. ceci peut etre du à :
            </p>
            <ul className="pl-3 ml-2 text-gray-700 list-disc">
              <li>La page que vous demander n&apos;est pas sur notre serveur</li>
              <li>L&apos;url que vous avez rentrer est incorrect</li>
              <li>Verifier votre connexion internet</li>
            </ul>
            <span
              onClick={() => router.back()}
              className="p-0.5 flex items-center mt-4 w-fit rounded-lg border-2 bg-white text-blue-600 border-blue-600">
              <ArrowLeftIcon className="h-4 w-4 mr-2" /> Retour
            </span>
          </div>
        </div>
        </div>
      </>
    );
}