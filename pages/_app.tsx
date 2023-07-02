import "../styles/globals.css";
import "aos/dist/aos.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AOS from "aos";
import { useEffect } from "react";
import { instance } from "../api";
import BackupSideMenu from "../components/BackupSideMenu";
import AdminNavigation from "../components/AdminNavigation";
import AdminSideNavigation from "../components/AdminSideNavigation";
import NoStaffNavigation from "../components/NoStaffNavigation";
import NoStaffSideNavigation from "../components/NoStaffSideNavigation";
import UCNavigation from "../components/UCNavigation";
import UCSideNavigation from "../components/UCSideNavigation";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    instance.interceptors.request.use((config) => {
      if (config.headers)
        config.headers.Authorization = localStorage.getItem("access_token");
      return config;
    });
    AOS.init();
  }, [router.pathname]);

  if (
    router.pathname.includes("/staff") &&
    !router.pathname.includes("/staff/backup")
  ) {
    return (
      <main className="h-full overflow-hidden w-full">
        <AdminNavigation />
        <section className=" w-full overflow-hidden h-full flex">
          <AdminSideNavigation />
          <div className="md:w-[85%] h-[calc(100%-56px)] p-2 overflow-auto w-full">
            <Component {...pageProps} />
          </div>
        </section>
      </main>
    );
  } else if (router.pathname.includes("/nostaff")) {
    return (
      <main className="h-full overflow-hidden w-full">
        <NoStaffNavigation />
        <section className=" w-full border-t overflow-hidden h-full flex">
          <NoStaffSideNavigation />
          <div className="lg:w-[85%] md:w-[80%]  h-[calc(100%-56px)] overflow-auto w-full">
            <Component {...pageProps} />
          </div>
        </section>
      </main>
    );
  } else if (router.pathname.includes("/staff/backup")) {
    return (
      <main className="h-full overflow-hidden w-full">
        <AdminNavigation />
        <section className=" w-full border-t overflow-hidden h-full flex">
          <AdminSideNavigation />
          <BackupSideMenu />
          <div className="lg:w-[65%]  h-[calc(100%-56px)] overflow-auto w-full">
            <Component {...pageProps} />
          </div>
        </section>
      </main>
    );
  } else {
    return (
      <main className="h-full overflow-hidden w-full">
        {/* <UCNavigation /> */}
        <section className=" w-full border-t overflow-hidden h-full flex">
          {/* <UCSideNavigation /> */}
          <div className="lg:w-[85%] md:w-[80%]  h-[calc(100%-56px)] overflow-auto w-full">
            <Component {...pageProps} />
          </div>
        </section>
      </main>
    );
  }
}
