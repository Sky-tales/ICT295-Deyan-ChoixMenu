import express from "express";
import {products} from "../db/mock-product.mjs";
import {success} from "./helper.mjs";

const productsRouter = express();
let comptage = products.length

productsRouter.get("/", (req, res) =>{
    const message = `La liste des produits ${comptage} a bien été enregistrée`
    res.json(success(message, products))
});

export {productsRouter}