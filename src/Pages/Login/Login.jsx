import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";

const Login = () => {
    const { user, googleSignIn, signIn } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const ourUser = signIn(data.email, data.password);
            console.log(ourUser);
        } catch (err) {
            console.log(err);
            Swal.fire("Some thing went wrong. Please try again...");
        }
    };

    const handleSignInWithGoogle = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
            Swal.fire("Something went wrong");
        }
    };

    return (
        <div>
            
                {user &&
                    <div role="alert" className="alert">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info h-6 w-6 shrink-0">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>You have already logged in.</span>
                </div>}
                <div className="hero bg-transparent min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <div>
                            <img src="https://i.ibb.co.com/jM05hcR/mobile-login-concept-illustration-114360-83.jpg" alt="" />
                        </div>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <h2 className="text-4xl font-bold text-center">Login Now</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    {...register("email", {
                                        required: true,
                                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    })}
                                />
                                {errors.email?.type === "required" && (
                                    <p role="alert" className="text-error">
                                        Email is required
                                    </p>
                                )}
                                {errors.email?.type === "pattern" && (
                                    <p role="alert" className="text-error">
                                        Please Provide a valid email
                                    </p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    {...register("password", {
                                        required: true,
                                        pattern:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                    })}
                                />
                                {errors.password?.type === "required" && (
                                    <p role="alert" className="text-error">
                                        Password is required
                                    </p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p role="alert" className="text-error">
                                        Your password contain at least one capital and small
                                        character, one number and one special character and length
                                        must be greater than 6 character
                                    </p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    disabled={user}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                            <p className="text-lg text-center">
                                Do not have an account?{" "}
                                <Link to={"/register"} className="btn-link">
                                    Register
                                </Link>
                            </p>
                        </form>
                        {
                            <button
                                onClick={() => handleSignInWithGoogle()}
                                className="btn"
                                disabled={user}
                            >
                                Sign In With Google
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;