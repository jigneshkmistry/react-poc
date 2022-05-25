import React from "react";
import TextInput from "../common/TextInput"
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function LoginForm({
    user,
    onSave,
    onChange,
    errors
}) {

    return (
        <>
            {errors.message && <div className="alert alert-danger">{errors.message}</div>}
            <form onSubmit={onSave}>
                <TextInput
                    name="username"
                    label="UserName"
                    value={user.username}
                    onChange={onChange}
                    error={errors.username}
                />

                <TextInput
                    name="password"
                    label="Password"
                    type="password"
                    value={user.password}
                    onChange={onChange}
                    error={errors.password}
                />

                <button type="submit" className="btn btn-primary">
                    Login
                </button>

                <Link className="btn btn-primary" role="button" to="/register">Register</Link>
            </form>
        </>
    );
}

LoginForm.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default LoginForm;