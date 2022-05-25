import React from "react";
import TextInput from "../common/TextInput"
import PropTypes from "prop-types";

function RegisterForm({
    register,
    onSave,
    onChange,
    errors
}) {

    return (
        <>
            {errors.message && <div className="alert alert-danger">{errors.message}</div>}
            <form onSubmit={onSave}>
                <h2>Register Form</h2>
                <TextInput
                    name="username"
                    label="UserName"
                    value={register.username}
                    onChange={onChange}
                    error={errors.username}
                />

                <TextInput
                    name="password"
                    label="Password"
                    type="password"
                    value={register.password}
                    onChange={onChange}
                    error={errors.password}
                />

                <TextInput
                    name="firstlastname"
                    label="FirstLastName"
                    value={register.firstlastname}
                    onChange={onChange}
                    error={errors.firstlastname}
                />

                <TextInput
                    name="address"
                    label="Address"
                    value={register.address}
                    onChange={onChange}
                    error={errors.address}
                />

                <TextInput
                    name="email"
                    label="Email"
                    value={register.email}
                    onChange={onChange}
                    error={errors.email}
                />

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </>
    );
}

RegisterForm.propTypes = {
    register: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default RegisterForm;