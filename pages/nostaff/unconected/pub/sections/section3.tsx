import "moment/locale/fr";
import { useEffect, useState } from "react";
import Post from "../../../../../api/post";
import PostSection3ModelNoStaff from "../../../../../components/PostSection3ModelNoStaff";

export default function section3() {
  const [postsRepost, setPostsRepost] = useState<Array<any>>();
  const [loadingRepost, setLoadingRepost] = useState(false);
  const [postsFavorite, setPostsFavorite] = useState<Array<any>>();
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const getPostsRepost = async (entreprizeId: string) => {
    setLoadingRepost(true);
    const result = await Post.getPostAllPublishedAndRepost(entreprizeId);
    if (result.results) {
      setPostsRepost(result.results);
    }
    setLoadingRepost(false);
  };
  const getPostsFavorite = async (entreprizeId: string) => {
    setLoadingFavorite(true);
    const result = await Post.getPostAllPublishedAndFavorisByUserLogged(entreprizeId);
    if (result.results) {
      setPostsFavorite(result.results);
    }
    setLoadingFavorite(false);
  };
  useEffect(() => {
    const entreprize = localStorage.getItem("entreprize");
    getPostsRepost(entreprize as string);
    getPostsFavorite(entreprize as string);
  }, []);

  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2">
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Républier</h1>
          <div className="flex flex-col gap-6">
            {/* posts */}
            {!loadingRepost ? (
              Array.isArray(postsRepost) && postsRepost.length > 0 ? (
                postsRepost.map((a, index) => (
                  <PostSection3ModelNoStaff key={index} post={a} />
                ))
              ) : (
                "No data"
              )
            ) : (
              <div className="flex h-40 w-full font-semibold  items-center justify-center">
                Loading...
              </div>
            )}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Favoris</h1>
          <div className="flex flex-col gap-6">
            {/* posts */}
            {!loadingFavorite ? (
              Array.isArray(postsFavorite) && postsFavorite.length > 0 ? (
                postsFavorite.map((a, index) => (
                  <PostSection3ModelNoStaff key={index} post={a} />
                ))
              ) : (
                "No data"
              )
            ) : (
              <div className="flex h-40 w-full font-semibold  items-center justify-center">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
