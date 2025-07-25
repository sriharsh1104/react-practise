import styles from "./Settings.module.scss";
import CommanButton from "../../Comman/CommanButton/CommanButton";

const Settings = () => {
  return (
    <div className={styles.settings}>
      <div className={styles.settings__header}>
        <h1 className={styles.settings__header__title}>Settings</h1>
        <p className={styles.settings__header__subtitle}>Customize your application preferences</p>
      </div>
      
      <div className={styles.settings__content}>
        <div className={styles.settings__content__section}>
          <h2 className={styles.settings__content__section__title}>Notifications</h2>
          <div className={styles.settings__card}>
            <div className={styles.settings__setting}>
              <div className={styles.settings__setting__info}>
                <div className={styles.settings__setting__info__title}>Email Notifications</div>
                <div className={styles.settings__setting__info__description}>Receive email updates about your account</div>
              </div>
              <div className={styles.settings__setting__control}>
                <label className={styles.settings__toggle}>
                  <input type="checkbox" className={styles.settings__toggle__input} defaultChecked />
                  <span className={styles.settings__toggle__slider}></span>
                </label>
              </div>
            </div>
            
            <div className={styles.settings__setting}>
              <div className={styles.settings__setting__info}>
                <div className={styles.settings__setting__info__title}>Push Notifications</div>
                <div className={styles.settings__setting__info__description}>Get push notifications on your device</div>
              </div>
              <div className={styles.settings__setting__control}>
                <label className={styles.settings__toggle}>
                  <input type="checkbox" className={styles.settings__toggle__input} />
                  <span className={styles.settings__toggle__slider}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.settings__content__section}>
          <h2 className={styles.settings__content__section__title}>Privacy</h2>
          <div className={styles.settings__card}>
            <div className={styles.settings__setting}>
              <div className={styles.settings__setting__info}>
                <div className={styles.settings__setting__info__title}>Profile Visibility</div>
                <div className={styles.settings__setting__info__description}>Control who can see your profile</div>
              </div>
              <div className={styles.settings__setting__control}>
                <select className={styles.settings__select}>
                  <option>Public</option>
                  <option>Friends Only</option>
                  <option>Private</option>
                </select>
              </div>
            </div>
            
            <div className={styles.settings__setting}>
              <div className={styles.settings__setting__info}>
                <div className={styles.settings__setting__info__title}>Data Sharing</div>
                <div className={styles.settings__setting__info__description}>Allow data to be used for analytics</div>
              </div>
              <div className={styles.settings__setting__control}>
                <label className={styles.settings__toggle}>
                  <input type="checkbox" className={styles.settings__toggle__input} defaultChecked />
                  <span className={styles.settings__toggle__slider}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.settings__form}>
          <h2 className={styles.settings__content__section__title}>Account</h2>
          <div className={styles.settings__form__row}>
            <div className={styles.settings__form__field}>
              <label className={styles.settings__form__field__label}>Language</label>
              <select className={styles.settings__form__field__input}>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className={styles.settings__form__field}>
              <label className={styles.settings__form__field__label}>Time Zone</label>
              <select className={styles.settings__form__field__input}>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC+0 (GMT)</option>
              </select>
            </div>
          </div>
          
          <div className={styles.settings__form__actions}>
            <CommanButton variant="primary">Save Settings</CommanButton>
            <CommanButton variant="outline">Reset to Default</CommanButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;