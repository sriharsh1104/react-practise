import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../Redux/Slice/userSlice";
import CommanButton from "../../../Comman/CommanButton/CommanButton";
import { withAuth } from "./SideBarHelper";
import styles from "./sideBar.module.scss";

export const SiderBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSignOut = () => {
    dispatch(setUser(""));
    navigate("/login");
  };

  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBar__nav}>
        {withAuth?.map((item) => (
          <NavLink 
            key={item.key} 
            to={item.to}
            className={({ isActive }) => 
              `${styles.sideBar__navItem} ${isActive ? styles.sideBar__navItemActive : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      
      <div className={styles.sideBar__footer}>
        <CommanButton 
          onClick={handleSignOut}
          variant="outline"
          fullWidth
        >
          Logout
        </CommanButton>
      </div>
    </div>
  );
};