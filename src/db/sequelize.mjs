import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize(
    "db_products", // Nom de la DB qui doit exister
    "DB_user", // Nom de l'utilisateur
    "Pa$$w0rd", // Mot de passe de l'utilisateur
    {
        host: "localhost",
//port: "6033", pour les conteneurs docker MySQL
        dialect: "mysql",
        logging: false,
    }
);
import { products } from "./mock-product.mjs";
import {ProductModel} from "../models/products.mjs";
// Le modèle product
const Product = ProductModel(sequelize, DataTypes);
let initDb = () => {
    return sequelize
        .sync({ force: true }) // Force la synchro => donc supprime les données également
        .then((_) => {
            importProducts();
            console.log("La base de données db_products a bien été synchronisée");
        });
};
const importProducts = () => {
// import tous les produits présents dans le fichier db/mock-product
    products.map((product) => {
        Product.create({
            name: product.name,
            price: product.price,
        }).then((product) => console.log(product.toJSON()));
    });
};
export { sequelize, initDb, Product };