import { setToken, setCSRFToken } from "./customer-token";
import * as mutation from "./mutations";
import throwUserErrors from "./throw-user-errors";
const handleLogin = (data)=>{
    throwUserErrors(data == null ? void 0 : data.errors);
    const token = data == null ? void 0 : data.token;
    if (token) {
        setToken(token);
        setCSRFToken(token);
    }
    return token;
};
export const handleAutomaticLogin = async (fetch, input)=>{
    try {
        const { tokenCreate  } = await fetch({
            query: mutation.SessionCreate,
            variables: {
                ...input
            }
        });
        handleLogin(tokenCreate);
    } catch (error) {
    //
    }
};
export default handleLogin;
