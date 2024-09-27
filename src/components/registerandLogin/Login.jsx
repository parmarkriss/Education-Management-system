import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { loginUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = loginUser(formData.email, formData.password);
        if (user) {
            if (user.role === "admin") {
                navigate("/admin");
            } else if (user.role === "teacher") {
                navigate("/teacher");
            } else if (user.role === "student") {
                navigate("/student");
            }
        } else {
            alert("Login failed"); // This will trigger if loginUser returns null
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
