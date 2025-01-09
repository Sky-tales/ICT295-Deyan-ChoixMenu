import express from "express";

import {getProduct, products, removeProduct, updateProduct} from "../db/mock-product.mjs";

import { success, getUniqueId } from "./helper.mjs";
import {Product} from "../db/sequelize.mjs";
import {Model as Products} from "sequelize";

const productsRouter = express();

productsRouter.get("/", (req, res) => {
    Product.findAll().then((products) => {
    const message = `La liste des produits a bien été récupérée.`;
    res.json(success(message, products));});
});

productsRouter.get("/:id", (req, res) => {
    /*const productId = req.params.id;
    const product = products.find((product) => product.id == productId);*/
    Product.findByPk(req.params.id).then((product) =>{
        const message = `Le produit dont l'id vaut ${product.id} a bien été récupéré.`;
        res.json(success(message, product));
    });

});

productsRouter.post("/", (req, res) => {
    /*const id = getUniqueId(products);
    const createdProduct = { ...req.body, ...{ id: id, created: new Date() } };
    products.push(createdProduct);*/
    Product.create(req.body).then((createdProduct) => {
        const message = `Le produit ${createdProduct.name} a bien été créé !`;
        res.json(success(message, createdProduct));
    });

});

productsRouter.delete("/:id", (req, res) => {
    /*const productId = req.params.id;
    let deletedProduct = getProduct(productId);
    removeProduct(productId);*/
Product.findByPk(req.params.id).then((deletedProduct) =>{
    Product.destroy({
        where: {id: deletedProduct.id},
    }).then((_) =>{
        const message = `Le produit ${deletedProduct.name} a bien été supprimé !`;
        res.json(success(message, deletedProduct));
    });
})
});

productsRouter.put("/:id", (req, res) => {
    const productId = req.params.id;
    const product = getProduct(productId);

// A noter que la propriété 'created' n'étant pas modifiée, sera conservée telle quelle.
    const updatedProduct = {
        id: productId,
        ...req.body,
        created: product.created,
    };
    updateProduct(productId, updatedProduct);

    const message = `Le produit ${updatedProduct.name} dont l'id vaut ${productId} a été mis à jour avec succès !`;

    res.json(success(message, updatedProduct));
});


export { productsRouter };