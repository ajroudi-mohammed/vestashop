const sortOptionsByPosition = (options)=>{
    return options.sort((firstOption, secondOption)=>{
        return firstOption.position - secondOption.position;
    });
};
export default sortOptionsByPosition;
