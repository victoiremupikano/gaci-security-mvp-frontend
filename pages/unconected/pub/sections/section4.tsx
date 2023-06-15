import { Swiper, SwiperSlide } from "swiper/react";
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
import { useEffect, useState } from "react";
import Post from "../../../../api/post";
import ClickableSpan from "../../../../components/ClickableSpan";
import GoBack from "../../../../components/GoBack";
import ReusableHeader from "../../../../components/ReusableHeader";
import fetch from "../../../../helpers/fetch";
import PostModel from "../../../../components/PostSection3Model";

export default function section4() {
  const [postsRepost, setPostsRepost] = useState<Array<any>>();
  const [postsFavorite, setPostsFavorite] = useState<Array<any>>();
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [count, setCount] = useState();
  const [loadingRepost, setLoadingRepost] = useState(false);

  const getPostsRepost = async (entreprizeId: string) => {
    setLoadingRepost(true);
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
    <section className="container mx-auto md:px-20 py-16">
        <div className="grid lg:grid-cols-2">
            <div className="item">
                <h1 className="font-bold text-4xl py-12">Reposter</h1>
                <div className="flex flex-col gap-6">
                    {/* posts */}
                    { data[1] ? <Post data={data[1]}></Post> : <></>}
                    { data[2] ? <Post data={data[2]}></Post> : <></>}
                    { data[3] ? <Post data={data[3]}></Post> : <></>}
                </div>
            </div>
            <div className="item">
                <h1 className="font-bold text-4xl py-12">Travel</h1>
                <div className="flex flex-col gap-6">
                    { data[4] ? <Post data={data[4]}></Post> : <></>}
                    { data[5] ? <Post data={data[5]}></Post> : <></>}
                    { data[2] ? <Post data={data[2]}></Post> : <></>}
                </div>
            </div>
        </div>
    </section>
  )
}