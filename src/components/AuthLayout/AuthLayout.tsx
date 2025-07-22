import Header from "../Private/comman/Header/Header";
import { SiderBar } from "../Private/comman/SideBar/SiderBar";

const AuthLayout = ({ children }: any) => {
  console.log(children, "children");
  return (
    <div>
      <Header />
      <div>
        <SiderBar />
      </div>
      <div>
        <main> {children}</main>
      </div>
    </div>
  );
};
export default AuthLayout;
