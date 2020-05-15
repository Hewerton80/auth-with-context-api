import React,{ createContext, useCallback, FC, useState } from "react";
import api from '../services/api';
import { AxiosResponse } from "axios";

interface User {
    name: string;
    email: string;
}

interface AuthContexData {
    singed: boolean;
    user: User | null;
    singIn():Promise<void>,
    singOut():Promise<void>
}


interface ResponseLogin {
    token: string;
    user: User | null;
}

const AuthContex = createContext<AuthContexData>({} as AuthContexData);// equivalente: const AuthContex = createContext<AuthContexData | null>({});

export const AuthProvider: FC = ({children})=>{

    const [user, setUser] = useState<User | null>(loadStorageData());

    function loadStorageData(): User | null{
        const userStorage = localStorage.getItem('user');
        const tokenStorage = localStorage.getItem('token');
        if(userStorage && tokenStorage){
            return JSON.parse(userStorage);
        }
        return null;
    }

    const handleLogin = useCallback(async ()=>{
        const response = await api.get< any, AxiosResponse<ResponseLogin> >('/auth');
        console.log('context: ', response.data);
        setUser(response.data.user);
        localStorage.setItem('user',JSON.stringify(response.data.user));
        localStorage.setItem('token',response.data.token);
    },[]);
    
    const handleLoout = useCallback(async ()=>{
        setUser(null);
        localStorage.clear();
    },[]);

    return (    
        <AuthContex.Provider
            value={{
                singed: !!user,
                user,
                singIn: handleLogin,
                singOut: handleLoout
            }}
        >
            {children}
        </AuthContex.Provider>
    )
};

export default AuthContex;