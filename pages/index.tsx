import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push("/auth/login")
  },[router])
  return <div>
    MUSACOM
  </div>
}
