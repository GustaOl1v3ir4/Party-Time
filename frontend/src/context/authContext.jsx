import { createContext, useEffect, useState } from "react";
import partyFetch from "../axios/config";


export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token) {
            getCurrentUser();
        } else {
            setLoading(false);
        }
    }, []);

    const getCurrentUser = async() => {
        try {
            const res = await partyFetch.get("/auth/");

            setUser(res.data);


        } catch (error) {
            console.log(error);
            logout();

        } finally {
            setLoading(false);
        }
    };

    const login = async(data) => {
        const res = await partyFetch.post("/auth/login", data);

        localStorage.setItem("token", res.data.token);

        setUser(res.data.user);
    };

    const register = async(data) => {
        const res = await partyFetch.post("/auth/register", data);

        localStorage.setItem("token", res.data.token);

        setUser(res.data.user);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <authContext.Provider 
        value={{
            user,
            loading,
            login,
            register,
            logout,
        }}
        >
        {children}
        </authContext.Provider>
    );

};
