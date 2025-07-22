import { useNavigate } from "react-router";

const LandingPage = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Landing Page</h1>
            <button onClick={() => navigate("/login")}>Login</button>
        </div>
    )
}

export default LandingPage;