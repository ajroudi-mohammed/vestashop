const removeItem = async ({ res ,  })=>{
    return res.status(200).json({
        data: null,
        errors: []
    });
};
export default removeItem;
