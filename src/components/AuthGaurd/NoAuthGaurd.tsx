import { Outlet } from "react-router";

const NoAuthGaurd = () => {
    return(

        <div>
        <Outlet/>
      </div>
    )
}
export default NoAuthGaurd;