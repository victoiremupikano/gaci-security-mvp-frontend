import Image from "next/image";
import Author from "../../../../components/Author";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import moment from "moment";
import "moment/locale/fr";
import Link from "next/link";
import Profile from "../../../../api/profile";
import { useEffect, useState } from "react";
import Post from "../../../../api/post";
import ClickableSpan from "../../../../components/ClickableSpan";
import GoBack from "../../../../components/GoBack";
import ReusableHeader from "../../../../components/ReusableHeader";
import fetch from "../../../../helpers/fetch";

export default function section2() {
  const [posts, setPosts] = useState<Array<any>>();
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);

  const getPosts = async (entreprizeId: string) => {
    setLoading(true);
    const result = await Post.getPostAllPublished(entreprizeId);
    if (result.results) {
      setPosts(result.results);
      setNext(result?.next?.split("/share_pub")[1] as string);
      setPrevious(result?.previous?.split("/share_pub")[1] as string);
      setCount(result.count);
    }
    setLoading(false);
  };
  const onClickNext = async () => {
    setLoading(true);
    const result = await fetch(next, "share_pub");
    if (result.results) {
      setPosts(result.results);
      setNext(result?.next?.split("/share_pub")[1]);
      setPrevious(result?.previous?.split("/share_pub")[1]);
      setCount(result.count);
    }
    setLoading(false);
  };
  const onClickPrev = async () => {
    setLoading(true);
    const result = await fetch(previous, "share_pub");
    if (result.results) {
      setPosts(result.results);
      setNext(result?.next?.split("/share_pub")[1]);
      setPrevious(result?.previous?.split("/share_pub")[1]);
      setCount(result.count);
    }
    setLoading(false);
  };
  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize");
    getPosts(entreprize as string);
  }, []);

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">
        Tous les postes publiée
      </h1>

      {/* grid columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {!loading ? (
          Array.isArray(posts) && posts.length > 0 ? (
            posts.map((a, index) => {
              return (
                <div className="item">
                  <div className="images">
                    <Link href={`/posts/${a.pk}`}>
                      <Image
                        src={a.image || "/placeholder.jpg"}
                        alt="img author"
                        height={350}
                        width={500}
                      />
                    </Link>
                  </div>
                  <div className="info flex justify-center flex-col py-4">
                    <div className="cat">
                      <Link href={`/posts/${a.pk}`}>
                        <p className="text-orange-600 hover:text-orange-800">
                          {"Catégorie unique"}
                        </p>
                      </Link>
                      <Link href={`/posts/${a.pk}`}>
                        <p className="text-gray-800 hover:text-gray-600">
                          - {moment(a.date_add).format("ll") || "Unknown"}
                        </p>
                      </Link>
                    </div>
                    <div className="title">
                      <Link href={`/posts/${a.pk}`}>
                        <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
                          {a.title || "Title"}
                        </p>
                      </Link>
                    </div>
                    <p className="text-gray-500 py-3">
                        {a.synthesis || "No Synthesis"}
                    </p>
                    <Author user={a?.user?.pk} />
                  </div>
                </div>
              );
            })
          ) : (
            "No data"
          )
        ) : (
          <div className="flex h-40 w-full font-semibold  items-center justify-center">
            Loading...
          </div>
        )}
      </div>
    </section>
  );
}