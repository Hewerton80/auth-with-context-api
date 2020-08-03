import React,{ createContext, useCallback, FC, useState, useEffect } from "react";
import api from '../services/api';
import { AxiosResponse } from "axios";
import Swal from 'sweetalert2'

interface User {
    name: string;
    email: string;
}

interface AuthContexData {
    singed: boolean;
    user: User | null;
    singIn():void,
    singOut():void
}


interface ResponseLogin {
    token: string;
    user: User | null;
}

const AuthContex = createContext<AuthContexData>({} as AuthContexData);// equivalente: const AuthContex = createContext<AuthContexData | null>({});

export const AuthProvider: FC = ({children})=>{

    const [load, setLoad] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        function delay(time: number){
            return new Promise( resolve => setTimeout(resolve, time) );
        }
        async function loadStorageData(){
            setLoad(()=>true);
            //Swal.showLoading() 
            console.log("verificando o token....");
            const tokenStorage = localStorage.getItem('token');
            const userStorage = localStorage.getItem('user');
            await delay(5000);//verificando token
            //Swal.hideLoading()
            console.log('terminou de veridicar o token')
            if(userStorage && tokenStorage){
                setUser(()=>JSON.parse(userStorage));
                console.log('terminou de setar o user')
            }
            else{
                setUser(()=> null);
            }
            setLoad(()=>false);
            console.log('terminou o load')
        }
        loadStorageData();
    },[])



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

            {load?
                <p>loading...</p>
                :
                children
            }
        </AuthContex.Provider>
    )
};

export default AuthContex;