import { NavLink, useNavigate } from "react-router";
import CommanButton from "../../../Comman/CommanButton/CommanButton";
import { withAuth } from "./SideBarHelper";

export const SiderBar = () => {
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    navigate("/login");
  };
  return (
    
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      
      {withAuth?.map((item) => (
        <div key={item.key}> <NavLink to={item.to}>{item.label}</NavLink></div>
      ))}
      <CommanButton onClick={() => handleSignOut}>Logout</CommanButton>
    </div>
  );
};