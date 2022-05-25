import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm"
import VerifyOTPForm from "./VerifyOTPForm"
import PropTypes from "prop-types";
import { Auth } from 'aws-amplify';
import Spinner from "../common/Spinner";

function LoginPage() {

    let navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '' });
    const [showLoginPage, setShowLoginPage] = useState(true);
    const [userObject, setUserObject] = useState({})
    const [verifyOTP, setVerifyOTP] = useState({ otp: '' });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleSave(event) {

        event.preventDefault();

        Auth.signIn(user.username, user.password).then((user) => {

            //setUser({ username: '', password: '' });
            setUserObject(user);
            setShowLoginPage(false);
        }).catch((error) => {

            console.log(JSON.stringify(error));
            setErrors({ message: error.message });
        });
    }

    function handleOTPSave(event) {

        event.preventDefault();
        const user = userObject

        Auth.confirmSignIn(user, verifyOTP.otp, user.preferredMFA).then((user) => {

            localStorage.setItem("isAutheticated", true);
            navigate("/courses");
            //history.push("/courses");
        }).catch((error) => {

            localStorage.setItem("isAutheticated", false);
            console.log(JSON.stringify(error));
            setErrors({ message: error.message });
        });
    }

    function handleReSendOTP(event) {

        Auth.resendSignUp(user.username).then((user) => {

            console.log(JSON.stringify(user));
        }).catch((error) => {

            console.log(JSON.stringify(error));
            setErrors({ message: error.message });
        });
    }

    function handleChange(event) {

        const { name, value } = event.target;

        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    function handleOTPChange(event) {

        const { name, value } = event.target;

        setVerifyOTP(prevOTP => ({
            ...prevOTP,
            [name]: value
        }));
    }

    return (
        <>
            <h1>Login Page</h1>
            {
                saving ? <Spinner /> :
                    showLoginPage ? <LoginForm user={user} onSave={handleSave} onChange={handleChange} errors={errors} /> :
                        <VerifyOTPForm verifyOTP={verifyOTP} onSave={handleOTPSave} reSendOTP={handleReSendOTP} onChange={handleOTPChange} errors={errors} />
            }


        </>
    );
}

LoginPage.propTypes = {
    // history: PropTypes.object.isRequired
};

export default LoginPage;