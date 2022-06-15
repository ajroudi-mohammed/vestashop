const normalizeUser = (_spreeSuccessResponse, spreeUser)=>{
    const email = spreeUser.attributes.email;
    return {
        email
    };
};
export default normalizeUser;
