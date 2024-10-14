import product from "../Model/product.js";
import productDb from "../Model/product.js";

async function productWatch(io) {
    let changeStreams = productDb.watch();
    //watching changes in productDb
    changeStreams.on("change", (change) => {
        console.log("listening to change stream on database");
        if (change.operationType === "insert") {
            let product = change?.fullDocument;
            io.emit("product", product);
        } else if (change.operationType === "update") {
            console.log("product updated")
            io.emit("product-update", change?.updateDescription);
        } else if (change.operationType === "delete") {
            io.emit("product-delete", change.documentKey._id);
        }
    });
}

export default productWatch;
