import { ValidationError } from "@vercel/commerce/utils/errors";
const getCustomMessage = (code, message)=>{
    switch(code){
        case "UNIDENTIFIED_CUSTOMER":
            message = "Cannot find an account that matches the provided credentials";
            break;
    }
    return message;
};
export const throwUserErrors = (errors)=>{
    if (errors && errors.length) {
        throw new ValidationError({
            errors: errors.map(({ code , message  })=>({
                    code: code ?? "validation_error",
                    message: getCustomMessage(code, message)
                }))
        });
    }
};
export default throwUserErrors;
