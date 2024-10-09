const read = async (req, res, next) => {
    console.log("called");
    try {
        let response = {
            success: 1,
            message: "Data fetched Successfully",
        };
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export default read;
