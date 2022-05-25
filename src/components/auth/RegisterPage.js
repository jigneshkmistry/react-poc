import React, { useState } from "react";
import RegisterForm from "./RegisterForm"
import { Auth } from 'aws-amplify';
import VerifyOTPForm from "./VerifyOTPForm"
import { useNavigate } from "react-router-dom";

function RegisterPage({ history }) {

    let navigate = useNavigate();
    const [register, setRegister] = useState({ username: '', password: '', email: '' });
    const [errors, setErrors] = useState({});
    const [showRegisterPage, setShowRegisterPage] = useState(true);
    // const [userObject, setUserObject] = useState({})
    const [verifyOTP, setVerifyOTP] = useState({ otp: '' });

    // const [saving, setSaving] = useState(false);

    function handleSave(event) {

        event.preventDefault();

        var firstName = register.firstlastname.split(" ")[0];
        var lastName = register.firstlastname.split(" ")[1];

        Auth.signUp({
            username: register.username,
            password: register.password,
            attributes: {
                email: register.email,
                given_name: firstName,
                family_name: lastName,
                address: register.address,
                gender: "Male",
                locale: "en"
            }
        }).then(data => {

            console.log(data);
            setShowRegisterPage(false);
        }).catch((error) => {

            console.log(JSON.stringify(error));
            setErrors({ message: error.message });
        });
    }

    function handleOTPSave(event) {

        event.preventDefault();
        //const user = userObject

        Auth.confirmSignUp(register.username, verifyOTP.otp).then((user) => {

            navigate("/");
        }).catch((error) => {

            console.log(JSON.stringify(error));
            setErrors({ message: error.message });
        });
    }

    function handleReSendOTP(event) {

        Auth.resendSignUp(register.username).then((user) => {

            console.log(JSON.stringify(user));
        }).catch((error) => {

            console.log(JSON.stringify(error));
            setErrors({ message: error.message });
        });
    }

    function handleChange(event) {

        const { name, value } = event.target;

        setRegister(prevUser => ({
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
            {showRegisterPage ?
                <RegisterForm register={register} onSave={handleSave} onChange={handleChange} errors={errors} /> :
                <VerifyOTPForm verifyOTP={verifyOTP} onSave={handleOTPSave} reSendOTP={handleReSendOTP} onChange={handleOTPChange} errors={errors} />}
        </>
    );
}

export default RegisterPage;