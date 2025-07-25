import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../Redux/Slice/themeSlice";
import CommanButton from "../../../Comman/CommanButton/CommanButton";
import { useNavigate } from "react-router";
import { setUser } from "../../../../Redux/Slice/userSlice";
import { withoutAuth } from "./HeaderHelper";
import styles from "./header.module.scss";
import { PrivatesRoutes } from "../../../AuthLayout/RoutesHelper";

interface HeaderProps {
  currentPage?: "landing" | "login" | "signup";
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state: any) => state.theme.theme);
  const user = useSelector((state: any) => state?.user?.user);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const userMenuOptions = [
    { value: "profile", label: "Profile", onClick: () => handleNavigation(PrivatesRoutes.find((route) => route.path === "profile")?.path || "") },
    { value: "settings", label: "Settings", onClick: () => handleNavigation(PrivatesRoutes.find((route) => route.path === "settings")?.path || "") },
    { value: "change-password", label: "Change Password", onClick: () => handleNavigation(PrivatesRoutes.find((route) => route.path === "change-password")?.path || "") },
    { value: "logout", label: "Logout", onClick: () => {
      dispatch(setUser(""));
      handleNavigation("/");
    }},
  ];

  const authButtons = withoutAuth.filter((btn) => 
    btn.showOn.includes(currentPage || "landing")
  );

  return (
    <div className={styles.header}>
      <div className={styles["header__title"]}>Header</div>
      <div className={styles["header__actions"]}>
        <CommanButton onClick={handleToggleTheme} variant="outline">
          {theme === "light" ? "🌞 Light" : "🌙 Dark"}
        </CommanButton>
        {user ? (
          <div className={styles["header__user-menu"]}>
            <CommanButton variant="outline">
              {user.label}
            </CommanButton>
            <div className={styles["header__dropdown"]}>
              {userMenuOptions?.map((option) => (
                <button
                  key={option.value}
                  className={styles["header__dropdown-item"]}
                  onClick={option.onClick}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {authButtons.map((btn) => (
              <CommanButton
                key={btn.key}
                onClick={() => handleNavigation(btn.to)}
                variant="outline"
              >
                {btn.label}
              </CommanButton>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
