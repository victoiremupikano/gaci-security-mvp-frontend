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
import Profile from "../../../../api/profile";
import { useEffect, useState } from "react";
import Post from "../../../../api/post";
import ClickableSpan from "../../../../components/ClickableSpan";
import GoBack from "../../../../components/GoBack";
import ReusableHeader from "../../../../components/ReusableHeader";
import fetch from "../../../../helpers/fetch";
import PostSection3Model from "../../../../components/PostSection3Model";

export default function section3() {
  const [posts, setPosts] = useState<Array<any>>();
  const [loading, setLoading] = useState(false);

  const getPosts = async (entreprizeId: string) => {
    setLoading(true);
    const result = await Post.getPostAllPublishedAndPopular(entreprizeId);
    if (result.results) {
      setPosts(result.results);
    }
    setLoading(false);
  };
  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize");
    getPosts(entreprize as string);
  }, []);

  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Postes populaire</h1>

      {/* swiper */}
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        {!loading ? (
          Array.isArray(posts) && posts.length > 0 ? (
            posts.map((a, index) => (
              <SwiperSlide key={index}>
                <PostSection3Model post={a}/>
              </SwiperSlide>
            ))
          ) : (
            "No data"
          )
        ) : (
          <div className="flex h-40 w-full font-semibold  items-center justify-center">
            Loading...
          </div>
        )}
      </Swiper>
    </section>
  );
}

