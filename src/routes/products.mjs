import express from "express";
import { success, getUniqueId } from "./helper.mjs";
import {Product} from "../db/sequelize.mjs";


const productsRouter = express();

productsRouter.get("/", (req, res) => {
    Product.findAll().then((products) => {
    const message = `La liste des produits a bien été récupérée.`;
    res.json(success(message, products));
    })
        .catch((error) =>{
            const message = "La liste des produits n'a pas pu être récupérée. Merci de réessayer dans quelques instants."
            res.status(500).json({ message, data: error });
        });
});

productsRouter.get("/:id", (req, res) => {
    Product.findByPk(req.params.id).then((product) =>{
        if (product === null) {
            const message = "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
            return res.status(404).json({message});
        }
        const message = `Le produit dont l'id vaut ${product.id} a bien été récupéré.`;
        res.json(success(message, product));
    })
        .catch((error) =>{
        const message = "Le produit n'a pas pu être récupérée. Merci de réessayer dans quelques instants."
        res.status(500).json({ message, data: error });
    });

});

productsRouter.post("/", (req, res) => {
    Product.create(req.body).then((createdProducts) => {
        const message = `Le produit ${createdProduct.name} a bien été créé !`;
        res.json(success(message, createdProduct));
    })
        .catch((error) =>{
            const message = "Le produit n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
            res.status(500).json({message,data:error});
        })
    ;

});

productsRouter.delete("/:id", (req, res) => {
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
    Product.update(req.body, {where: {id: productId}})
        .then((_)=>{
            return Product.findByPk(productId)
                .then((updateProduct)=>{
                    if(updateProduct === null){
                        const message = "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
                        return res.status(404).json({message});
                    }
                const message = `Le produit ${updatedProduct.name} dont l'id vaut ${productId} a été mis à jour avec succès !`;
                res.json(success(message, updatedProduct));
        });
        })
        .catch((error)=>{
            const message = "Le produit n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
            res.status(500).json({message})
        });

});


export { productsRouter };