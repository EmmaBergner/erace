import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { useNavigate } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const handleMount = async () => {
        try {
            const { data } = await axiosRes.get('dj-rest-auth/user/')
            if (data) {
                console.log("CurrentUserProvider", "User", data.username);
                setCurrentUser(data)
            }
            else {
                console.log("CurrentUserProvider", "No  user");
                setCurrentUser((prevCurrentUser) => {
                    if (prevCurrentUser) {
                        navigate("/signin");
                    }
                    return null;
                })

            }
        } catch (err) {
            if (err?.response?.status !== 401) {
                console.log("CurrentUserProvider", "Not signed out", err);
            }
            else {
                console.log("CurrentUserProvider", "Signed out", err);
                setCurrentUser((prevCurrentUser) => {
                    if (prevCurrentUser) {
                        navigate("/signin");
                    }
                    return null;
                })
                navigate("/signin")
            }
        }
    };

    useEffect(() => {
        handleMount();
        // eslint-disable-next-line
    }, []);

    //////////////////// Interceptors /////////////////// 

    const navigate = useNavigate();

    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                if (shouldRefreshToken()) {
                    try {
                        console.log("axiosReq", "Post refresh");
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (err) {
                        console.log("axiosReq", "Refresh failed", err);
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                navigate("/signin");
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                        return config;
                    }
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
                if (err.response?.status === 401) {
                    try {
                        console.log("axiosRes", "Post refresh", err);
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (err) {
                        console.log("axiosRes", "Refresh failed", err);
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                navigate("/signin");
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                    }
                    return axios(err.config);
                }
                return Promise.reject(err);
            }
        );
    }, [navigate]);

    ///////////// End interceptors ///////////////////

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};