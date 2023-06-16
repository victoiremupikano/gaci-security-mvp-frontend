import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";

declare type Props = {
  title: string;
  path: string;
  message: string;
  text: string;
};

export default function UserSuccessBox({ title, path, message, text }: Props) {
  const router = useRouter();
  return (
    <div className="w-11/12 lg:w-7/12 md:border md:mt-10 md:w-10/12 mx-auto md:h-80 h-fit shadow-gray-300 shadow-lg rounded overflow-hidden">
      <div
        data-aos="zoom-in"
        data-aos-duration="500"
        className="w-full relative h-full flex md:flex-row flex-col overflow-hidden rounded"
      >
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="md:w-1/2 w-full md:h-full h-48 flex justify-center items-center flex-col bg-green-500"
        >
          <CheckCircleIcon className="h-36 w-36 text-white" />
          <span className="text-center font-semibold text-lg text-white">
            {title}
          </span>
        </div>
        <div className="md:w-1/2 w-full md:h-full h-48 grid place-items-center">
          <div className="flex w-full items-center justify-center h-full flex-col">
            <span className="w-11/12 text-gray-800 font-semibold md:text-left ">
              {message}
            </span>
            <div className="w-11/12 flex md:justify-start justify-center mt-4">
              <Link href={path}>
                <span className=" bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors duration-500 p-1.5">
                  {text} &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
        <XMarkIcon
          onClick={() => router.back()}
          className="absolute right-1 top-1 w-7 h-7 md:text-gray-700 text-white cursor-pointer md:hover:bg-gray-200 hover:bg-green-600  duration-500 transition-colors rounded"
        />
      </div>
    </div>
  );
}
