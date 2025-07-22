import { useDashboard } from "../../../api/hooks/hooks";
import Loader from "../../Comman/Loader/Loader";
import toast from "react-hot-toast";

const Dashboard = () => {
    const { data, isLoading, error } = useDashboard();
    console.log('data', data)

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        toast.error("Error loading dashboard");
        return <div>Error loading dashboard</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {/* Display dashboard data here */}
        </div>
    );
};

export default Dashboard;