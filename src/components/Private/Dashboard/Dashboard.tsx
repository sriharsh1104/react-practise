import { useDashboard } from "../../../api/hooks/hooks";
import toast from "react-hot-toast";

const Dashboard = () => {
    const { data, error } = useDashboard();
    console.log('data', data)

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