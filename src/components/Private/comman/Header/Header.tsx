import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../Redux/Slice/themeSlice";
import CommanButton from "../../../Comman/CommanButton/CommanButton";
import { useNavigate } from "react-router";
import { setUser } from "../../../../Redux/Slice/userSlice";
import { withoutAuth } from "./HeaderHelper";
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

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  const handleSignOut = () => {
    dispatch(setUser(""));

    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div>Header</div>
      <CommanButton onClick={handleToggleTheme} variant="outline">
        {theme === "light" ? "🌞 Light" : "🌙 Dark"}
      </CommanButton>
      {user ? (
        <CommanButton onClick={handleSignOut} variant="outline">
          Sign Out
        </CommanButton>
      ) : (
        <>
          {withoutAuth
            .filter((btn) => btn.showOn.includes(currentPage || "landing"))
            .map((btn) => (
              <CommanButton
                key={btn.key}
                onClick={() => handleNavigate(btn.to)}
                variant="outline"
              >
                {btn.label}
              </CommanButton>
            ))}
        </>
      )}
    </div>
  );
};

export default Header;
