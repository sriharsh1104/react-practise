import Header from '../../Private/comman/Header/Header';

const LandingPage = () => {
    // const navigate = useNavigate();
    
    return (
        <>
            <Header currentPage="landing" />
            <div>
                <h1>Landing Page</h1>
                {/* <button onClick={() => navigate("/login")}>Login</button> */}
            </div>
        </>
    )
}

export default LandingPage;