import { Navigate, Outlet } from "react-router";
import AuthLayout from "../AuthLayout/AuthLayout";
import { useSelector } from "react-redux";

const AuthGaurd = () => {
  const user = useSelector((state: any) => state?.user?.user);
  if(!user){
    return <Navigate to="/" />
  }
    return(

        <AuthLayout>
            <Outlet/>
        </AuthLayout>
    )
}
export default AuthGaurd;