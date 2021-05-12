import { useState } from 'react';
import { useJwt } from "react-jwt";

export default function useAuth() {
    const [token, setToken] = useState(() => {
        return sessionStorage.getItem('token') || null
    });
    const { decodedToken: user, isExpired } = useJwt(token);
    const saveToken = (rawToken) => {
        sessionStorage.setItem('token', rawToken);
        setToken(rawToken);
    }

    return {
        token,
        user,
        isExpired,
        saveToken
    }
}