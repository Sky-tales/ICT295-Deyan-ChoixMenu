import express from "express";
import {products} from "../bd/mock-product.mjs";
import {success} from "./helper.mjs";

const productRouter = express();

productRouter.get("/", (req, res) =>{
    const message = "La liste des produits a bien été enregistrée"
    res.json(success(message, products))
});

export {productRouter}