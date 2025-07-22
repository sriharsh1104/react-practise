import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../Redux/Slice/userSlice";
import { useNavigate } from "react-router";
import { useLogin } from "../../../api/hooks/hooks";
import InputCustom from "../../Comman/InputCustom/inputCustom";
import CommanButton from "../../Comman/CommanButton/CommanButton";
// import { login } from "../../../Redux/Slices/AuthSlice";

const Login = () => {
  const user = useSelector((state: any) => state?.user?.user);
  console.log(user, "userdsadsada");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LoginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: login, isPending } = useLogin();
  console.log(isPending, "isLoading");

  const onSubmit = (data: any) => {
    console.log(data, "data");
    login(data);
    dispatch(setUser(data.email));
    navigate("/auth/dashboard");
  };
  return (
    <div>
      <form onSubmit={LoginForm.handleSubmit(onSubmit)}>
        <InputCustom
          type="email"
          // {...LoginForm.register("email")}
          placeholder="Email"
        />
        <InputCustom
          type="password"
          // {...LoginForm.register("password")}
          placeholder="Password"
        />

        <CommanButton type="submit">Login</CommanButton>
      </form>
    </div>
  );
};

export default Login;
