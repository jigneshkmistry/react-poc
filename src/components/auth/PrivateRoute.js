import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify"

const PrivateRoute = ({ children }) => {

    let navigate = useNavigate();

    useEffect(() => {

        Auth.currentAuthenticatedUser().then(data => {

            console.log(data);
        }).catch((error) => {

            navigate("/");
        });
    });

    return children;
}


export default PrivateRoute;
