import React from "react";
import TextInput from "../common/TextInput"
import PropTypes from "prop-types";

function VerifyOTPForm({
    verifyOTP,
    onSave,
    reSendOTP,
    onChange,
    errors
}) {

    return (
        <>
            <form onSubmit={onSave}>
                <h2>VerifyOTP Form</h2>
                <div id="emailHelp" className="form-text">OTP has been sent to your number please verify it below.</div>

                <TextInput
                    name="otp"
                    label="OTP"
                    value={verifyOTP.otp}
                    onChange={onChange}
                    error={errors.otp}
                />
                <div id="emailHelp" className="form-text">Did not receive the OTP?</div>

                <button type="button" className="btn btn-link" onClick={reSendOTP}>
                    ResendOTP
                </button>

                <button type="submit" className="btn btn-primary">
                    VerifyOTP
                </button>
            </form>
        </>
    );
}

VerifyOTPForm.propTypes = {
    verifyOTP: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    reSendOTP: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default VerifyOTPForm;