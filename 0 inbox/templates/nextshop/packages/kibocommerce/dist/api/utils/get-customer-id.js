import { getCustomerAccountQuery } from "../queries/get-customer-account-query";
async function getCustomerId({ customerToken , config  }) {
    var ref;
    const token = customerToken ? Buffer.from(customerToken, "base64").toString("ascii") : null;
    const accessToken = token ? JSON.parse(token).accessToken : null;
    const { data  } = await config.fetch(getCustomerAccountQuery, undefined, {
        headers: {
            "x-vol-user-claims": accessToken
        }
    });
    return data == null ? void 0 : (ref = data.customerAccount) == null ? void 0 : ref.id;
}
export default getCustomerId;
