import { Link } from "react-router";

const Unauthorized = () => {
    return (
        <div>
            You are unauthorized
            <Link to='/'>Go Home</Link>
        </div>
    );
};
export default Unauthorized;