import { useNavigate } from 'react-router-dom';

const Auth = (App) => {
    
    return (props) => {
        const navigate = useNavigate();
        if (!props.user) {
            navigate("/login");
            return null;
        }

        return <App {...props} />;
    }
}

export default Auth;