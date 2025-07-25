import styles from "./Profile.module.scss";
import CommanButton from "../../Comman/CommanButton/CommanButton";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile__header}>
        <h1 className={styles.profile__header__title}>Profile</h1>
        <p className={styles.profile__header__subtitle}>Manage your account settings and preferences</p>
      </div>
      
      <div className={styles.profile__content}>
        <div className={styles.profile__avatar}>
          <div className={styles.profile__avatar__image}>JD</div>
          <div className={styles.profile__avatar__info}>
            <div className={styles.profile__avatar__info__name}>John Doe</div>
            <div className={styles.profile__avatar__info__email}>john.doe@example.com</div>
          </div>
        </div>
        
        <div className={styles.profile__form}>
          <div className={styles.profile__form__row}>
            <div className={styles.profile__form__field}>
              <label className={styles.profile__form__field__label}>First Name</label>
              <input 
                type="text" 
                className={styles.profile__form__field__input}
                defaultValue="John"
              />
            </div>
            <div className={styles.profile__form__field}>
              <label className={styles.profile__form__field__label}>Last Name</label>
              <input 
                type="text" 
                className={styles.profile__form__field__input}
                defaultValue="Doe"
              />
            </div>
          </div>
          
          <div className={styles.profile__form__field}>
            <label className={styles.profile__form__field__label}>Email</label>
            <input 
              type="email" 
              className={styles.profile__form__field__input}
              defaultValue="john.doe@example.com"
            />
          </div>
          
          <div className={styles.profile__form__field}>
            <label className={styles.profile__form__field__label}>Phone</label>
            <input 
              type="tel" 
              className={styles.profile__form__field__input}
              defaultValue="+1 (555) 123-4567"
            />
          </div>
          
          <div className={styles.profile__form__actions}>
            <CommanButton variant="primary">Save Changes</CommanButton>
            <CommanButton variant="outline">Cancel</CommanButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;