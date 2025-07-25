import Header from "../Private/comman/Header/Header";
import { SiderBar } from "../Private/comman/SideBar/SiderBar";
import commonStyles from "../Private/comman/common.module.scss";

const AuthLayout = ({ children }: any) => {
  console.log(children, "children");
  return (
    <div className={commonStyles.privateLayout}>
      <Header />
      <SiderBar />
      <div className={commonStyles.privateLayout__content}>
        <main>{children}</main>
      </div>
    </div>
  );
};
export default AuthLayout;
