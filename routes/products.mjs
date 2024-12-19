import express from "express";

import { products } from "../db/mock-product.mjs";

import { success } from "./helper.mjs";

const productsRouter = express();

productsRouter.get("/", (req, res) => {
    const message = `La liste des produits a bien été récupérée.`;
    res.json(success(message, products));
});

productsRouter.get("/:id", (req, res) => {
    const productId = req.params.id;
    const product = products.find((product) => product.id == productId);
    const message = `Le produit dont l'id vaut ${productId} a bien été récupéré.`;
    res.json(success(message, product));
});


export { productsRouter };