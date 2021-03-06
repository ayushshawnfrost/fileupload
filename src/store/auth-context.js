import React,{useState} from 'react';
const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    Login: (token)=>{},
    Logout: ()=>{}
});
export const AuthContextProvider = (props)=>{
    const [token,setToken] = useState(null);
    const userIsLoggedIn = !!token;
    const LoginHandler = (token) =>{
        setToken(token);
    };
    const LogoutHandler = () =>{
        setToken(null);
    };
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login:LoginHandler,
        logout:LogoutHandler
    };
    return( <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
        );
};
export default AuthContext;
