import { ValidationError } from "@vercel/commerce/utils/errors";
import { setCustomerToken } from "./customer-token";
const getErrorMessage = ({ code , message  })=>{
    switch(code){
        case "UNIDENTIFIED_CUSTOMER":
            message = "Cannot find an account that matches the provided credentials";
            break;
    }
    return message;
};
const handleLogin = (data)=>{
    const response = data.customerAccessTokenCreate;
    const errors = response == null ? void 0 : response.customerUserErrors;
    if (errors && errors.length) {
        throw new ValidationError({
            message: getErrorMessage(errors[0])
        });
    }
    const customerAccessToken = response == null ? void 0 : response.customerAccessToken;
    const accessToken = customerAccessToken == null ? void 0 : customerAccessToken.accessToken;
    if (accessToken) {
        setCustomerToken(accessToken);
    }
    return customerAccessToken;
};
export default handleLogin;
