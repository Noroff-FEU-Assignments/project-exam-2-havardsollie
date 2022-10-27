import React from "react";
import useLocalStorage from "../settings/storage/Storage";

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
	const [auth, setAuth] = useLocalStorage("auth", null);
	return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export default AuthContext;