export const withoutAuth = [
    {
      key: "landing",
      label: "Home",
      showOn: ["login", "signup"],
      to: "/",
    },
    {
      key: "signup",
      label: "Sign Up",
      showOn: ["landing", "login"],
      to: "/signup",
    },
    {
      key: "login",
      label: "Sign In",
      showOn: ["landing", "signup"],
      to: "/login",
    },
  ];