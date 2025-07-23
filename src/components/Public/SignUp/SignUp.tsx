import { useForm } from "react-hook-form";
import Header from "../../Private/comman/Header/Header";
import CommanButton from "../../Comman/CommanButton/CommanButton";
import { useSignup } from "../../../api/hooks/hooks";
import InputCustom from "../../Comman/InputCustom/inputCustom";
import CommanPhoneInput from "../../Comman/CommanPhoneInput/CommanPhoneInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm Password is required"),
    phone: yup.string().required("Phone is required"),
    role: yup.string().required("Role is required"),
    isActive: yup.boolean().required("Is Active is required"),
  });
  const signUpForm = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "user",
      isActive: true,
    },
  });

  
  const { mutate: signup, isPending } = useSignup();
  const onSubmit = (data: any) => {
    signup(data);
  };
  return (
    <>
      <Header currentPage="signup" />
      <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
        <InputCustom
          type="text"
          placeholder="Name"
          {...signUpForm.register("name")}
        />
        <InputCustom
          type="email"
          placeholder="Email"
          {...signUpForm.register("email")}
        />
        <InputCustom
          type="password"
          placeholder="Password"
          {...signUpForm.register("password")}
        />
        <InputCustom
          type="password"
          placeholder="Confirm Password"
          {...signUpForm.register("confirmPassword")}
        />
        <CommanPhoneInput
          // type="text"
          placeholder="Phone"
          {...signUpForm.register("phone")}
        />
        <InputCustom
          type="text"
          value="user"
          placeholder="Role"
          {...signUpForm.register("role")}
        />
        <CommanButton type="submit">SignUp</CommanButton>
      </form>
    </>
  );
};

export default SignUp;