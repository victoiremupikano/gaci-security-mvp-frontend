import { useEffect, useState } from "react";
import {useRouter } from "next/router";
import auth from "../api/auth";
export default  function useVerify() {
    const router = useRouter()
    const [isLogged, setIsLogged] = useState(false)
    const verify = async () => {
        const result = await auth.verifyToken();
        if (result && result.detail) {
            return true;
        }
        return false;
    }
    useEffect(() => {
        const data = localStorage.getItem('user_data')
        const access = localStorage.getItem('access_token')
        const refresh = localStorage.getItem('refresh_token')
        const staff = localStorage.getItem('staff')

        if (data && access && refresh && staff) {
            
            verify().then(result => {
                if (result) {
                    setIsLogged(true)
                } else {
                    localStorage.clear()
                    router.push("/auth/login")
                }
            })
        } else {
            router.push("/auth/login")
        }
        
    }, [router])   
    return isLogged
}