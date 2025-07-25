import styles from "./ChangePassword.module.scss";
import CommanButton from "../../Comman/CommanButton/CommanButton";
import InputCustom from "../../Comman/InputCustom/inputCustom";

const ChangePassword = () => {
  return (
    <div className={styles.changePassword}>
      <div className={styles.changePassword__header}>
        <h1 className={styles.changePassword__header__title}>Change Password</h1>
        <p className={styles.changePassword__header__subtitle}>Update your password to keep your account secure</p>
      </div>
      
      <div className={styles.changePassword__content}>
        <div className={styles.changePassword__form}>
          <div className={styles.changePassword__form__field}>
            <label className={styles.changePassword__form__field__label}>Current Password</label>
            <InputCustom 
              type="password" 
              className={styles.changePassword__form__field__input}
              placeholder="Enter your current password"
            />
          </div>
          
          <div className={styles.changePassword__form__field}>
            <label className={styles.changePassword__form__field__label}>New Password</label>
            <InputCustom 
              type="password" 
              className={styles.changePassword__form__field__input}
              placeholder="Enter your new password"
            />
            <div className={styles.changePassword__form__field__description}>
              Password must be at least 8 characters long
            </div>
          </div>
          
          <div className={styles.changePassword__form__field}>
            <label className={styles.changePassword__form__field__label}>Confirm New Password</label>
            <input 
              type="password" 
              className={styles.changePassword__form__field__input}
              placeholder="Confirm your new password"
            />
          </div>
          
          <div className={styles.changePassword__form__actions}>
            <CommanButton variant="primary">Update Password</CommanButton>
            <CommanButton variant="outline">Cancel</CommanButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;