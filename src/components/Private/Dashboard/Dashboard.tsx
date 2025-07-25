import { useDashboard } from "../../../api/hooks/hooks";
import toast from "react-hot-toast";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
    const { data, error } = useDashboard();
    console.log('data', data)

    if (error) {
        toast.error("Error loading dashboard");
        return <div className={styles.dashboard__content}>Error loading dashboard</div>;
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboard__header}>
                <h1 className={styles.dashboard__header__title}>Dashboard</h1>
                <p className={styles.dashboard__header__subtitle}>Welcome back! Here's what's happening today.</p>
            </div>
            
            <div className={styles.dashboard__stats}>
                <div className={styles.dashboard__card}>
                    <div className={styles.dashboard__card__stat}>1,234</div>
                    <div className={styles.dashboard__card__label}>Total Users</div>
                </div>
                <div className={styles.dashboard__card}>
                    <div className={styles.dashboard__card__stat}>567</div>
                    <div className={styles.dashboard__card__label}>Active Sessions</div>
                </div>
                <div className={styles.dashboard__card}>
                    <div className={styles.dashboard__card__stat}>89%</div>
                    <div className={styles.dashboard__card__label}>Uptime</div>
                </div>
            </div>
            
            <div className={styles.dashboard__content}>
                <div className={styles.dashboard__content__section}>
                    <h2 className={styles.dashboard__content__section__title}>Recent Activity</h2>
                    <div className={styles.dashboard__recent}>
                        <div className={styles.dashboard__recent__item}>
                            <div className={styles.dashboard__recent__item__icon}>👤</div>
                            <div className={styles.dashboard__recent__item__content}>
                                <div className={styles.dashboard__recent__item__content__title}>New user registered</div>
                                <div className={styles.dashboard__recent__item__content__description}>John Doe joined the platform</div>
                            </div>
                            <div className={styles.dashboard__recent__item__time}>2 min ago</div>
                        </div>
                        <div className={styles.dashboard__recent__item}>
                            <div className={styles.dashboard__recent__item__icon}>📊</div>
                            <div className={styles.dashboard__recent__item__content}>
                                <div className={styles.dashboard__recent__item__content__title}>Report generated</div>
                                <div className={styles.dashboard__recent__item__content__description}>Monthly analytics report</div>
                            </div>
                            <div className={styles.dashboard__recent__item__time}>15 min ago</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;