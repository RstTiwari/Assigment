import productDb from "../Model/product.js";
const productController = {
    create: async (req, res, next) => {
        try {
            if (!req.body) {
                throw new Error("Invalid Payload");
            }
            const product = new productDb(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const product = await productDb.findByIdAndUpdate(
                req.params.id,
                req.body
            );

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            next(error); // catching error and customizing it
        }
    },
    delete: async (req, res, next) => {
        try {
            const product = await productDb.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product deleted successfully" });
        } catch (error) {
            next(error);
        }
    },
};

export default productController;
