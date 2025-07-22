import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../Redux/Slice/userSlice";
import { useNavigate } from "react-router";
// import { login } from "../../../Redux/Slices/AuthSlice";

const Login = () => {
  const user = useSelector((state: any) => state?.user?.user);
  console.log(user,"userdsadsada");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LoginForm = useForm({
    defaultValues: {
      email: "",
      // password: "",
    },
    
  });

  const onSubmit = (data: any) => {
    console.log(data,"data");
    dispatch(setUser(data.email));
    navigate("/auth/dashboard");
  };
  return (
    <div>
      <form onSubmit={LoginForm.handleSubmit(onSubmit)}>
        <input type="email" {...LoginForm.register("email")} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;