import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Redux/Slice/userSlice";
import { useNavigate } from "react-router";
import { useLogin } from "../../../api/hooks/hooks";
import InputCustom from "../../Comman/InputCustom/inputCustom";
import CommanButton from "../../Comman/CommanButton/CommanButton";
import Header from "../../Private/comman/Header/Header";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const LoginForm = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
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
    <>
    <Header currentPage="login" />
    <div>
      <form onSubmit={LoginForm.handleSubmit(onSubmit)}>
        <InputCustom
          type="email"
          {...LoginForm.register("email")}
          placeholder="Email"
        />
        <InputCustom
          type="password"
          {...LoginForm.register("password")}
          placeholder="Password"
        />

        <CommanButton type="submit">Login</CommanButton>
      </form>
    </div>
    </>
  );
};

export default Login;
