import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../providers/AuthProvider";
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const { createUser, user, signinWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    if (user) {
        navigate(location?.state?.from || '/');
    }
    const handalRegister = e => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        console.log(name, photo, email, password);

        // Registration validation start
        if (password.length < 6) {
            setRegisterError('password should have 6 characters')
            return;
        }
        if (!/[A-Z]/.test(password)) { // Check for the absence of a capital letter
            setRegisterError('Password should have a capital letter');
            return;
        }
        if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(password)) {
            setRegisterError('Password should have at least one special character');
            return;
        }
        // Registration validation End
        setRegisterError('');
        setSuccess('');
        // create user
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User created successfully');
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo,
                })
                    .then(() => {
                        console.log('profile updted');
                    })
                    .catch(error => {
                        console.log(error.message);

                    })
                navigate(location?.state?.from || '/');
            })
            .catch(error => {
                setRegisterError(error.message);
            })


    }

    const handalGoogleSignIn = () => {
        signinWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/');
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <>
            <Card className="max-w-sm mx-auto mt-10 mb-10">
                <form className="flex flex-col gap-4" onSubmit={handalRegister}>
                <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Your Name" />
                        </div>
                        <TextInput id="name" name="name" type="text" placeholder="Your Full Name" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="photo" value="Photo URL" />
                        </div>
                        <TextInput id="photo" name="photo" type="text" placeholder="Photo URL" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput id="email1" name="email" type="email" autoComplete="email" placeholder="name@email.com" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" name="password" autoComplete="password" type="password" required />
                    </div>
                    <Button type="submit">SignUp</Button>
                </form>
                {
                    registerError && <p className="text-center text-red-700">{registerError}</p>
                }
                {
                    success && <p className="text-center text-green-700">{success}</p>
                }
                <div className="text-center pb-2 ">
                    <Link to="/login">
                        have a account ? <span className="text-blue-600">Login Here</span>
                    </Link>
                </div>
                <div className="flex flex-row text-blue-600 font-bold justify-center items-center text-center pb-8 ">
           <FaGoogle/><div className="btn  cursor-pointer pl-2" onClick={handalGoogleSignIn}>Login with Google</div>
           </div>
            </Card>
        </>
    );
}

export default SignUp;