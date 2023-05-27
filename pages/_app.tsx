import "../styles/globals.css";
import "aos/dist/aos.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Navigation from "../components/Navigation";
import ReusableFooter from "../components/ReusableFooter";
import AOS from "aos";
import { useEffect } from "react";
import { instance } from "../api";
import NoStaffNavigation from "../components/NoStaffNavigation";
import AdminNavigation from "../components/AdminNavigation";
import AdminSideNavigation from "../components/AdminSideNavigation";
import NoStaffSideNavigation from "../components/NoStaffSideNavigation";

export default function App({ Component, pageProps }: AppProps) {
  const mainRoutes = ["/auth/login", "/auth/reset-pwd"];
  const router = useRouter();

  const path = router.pathname;
  useEffect(() => {
    instance.interceptors.request.use((config) => {
      if (config.headers)
        config.headers.Authorization = localStorage.getItem("access_token");
      return config;
    });
    AOS.init();
  }, [router.pathname]);

  if (router.pathname.includes('/staff') && !router.pathname.includes("/staff/reports")) {
    return (
      <main className="h-full overflow-hidden w-full">
        <AdminNavigation />
        <section className=" w-full overflow-hidden h-full flex">
          <AdminSideNavigation/>
          <div className="md:w-[85%] h-[calc(100%-56px)] p-2 overflow-auto w-full">
          <Component {...pageProps} />
          </div>
        </section>
        <ReusableFooter />
      </main>
    );
  } else if (router.pathname.includes('/simple')) {
    return (
      <main className="h-full overflow-hidden w-full">
        <NoStaffNavigation />
        <section className=" w-full border-t overflow-hidden h-full flex">
          <NoStaffSideNavigation/>
          <div className="lg:w-[85%] md:w-[80%]  h-[calc(100%-56px)] overflow-auto w-full">
          <Component {...pageProps} />
          </div>
        </section>
        <ReusableFooter />
      </main>
    );
  }
  else {
    return (
      <main className="h-full w-full">
        <section className=" w-11/12 h-full flex items-center mx-auto">
          <Component {...pageProps} />
        </section>
        <ReusableFooter />
      </main>
    );
  }
}
