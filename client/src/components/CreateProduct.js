import { useState } from "react";
import { ethers } from "ethers";
const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}
const CreateProduct = ({ dappazon, provider, addNewProduct }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [stock, setStock] = useState("");

    const createProductHandler = async () => {
        const signer = provider.getSigner();
        const transaction = await dappazon
            .connect(signer)
            .addProduct(name, category, image, tokens(price), rating, stock);
        await transaction.wait();

        const newProduct = {
            name,
            category,
            image,
            price: tokens(price),
            rating,
            stock,
        };

        addNewProduct(newProduct);
    };

    return (
        <div>
            <h2>Create Product</h2>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
            <input type="text" placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
            <input type="text" placeholder="Price (ETH)" onChange={(e) => setPrice(e.target.value)} />
            <input type="number" placeholder="Rating" onChange={(e) => setRating(e.target.value)} />
            <input type="number" placeholder="Stock" onChange={(e) => setStock(e.target.value)} />
            <button onClick={createProductHandler}>Add Product</button>
        </div>
    );
};

export default CreateProduct;