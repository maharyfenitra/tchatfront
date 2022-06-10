import { Link } from "react-router-dom"
export default function Login() {
    return <div>
        <h1>Login to my chat</h1>
        Login
        <Link to={"/register"}>Create new accompte!</Link>
    </div>
}