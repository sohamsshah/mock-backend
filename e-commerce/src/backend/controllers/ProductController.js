import { Response } from "miragejs";

/**
 * All the routes related to Product are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/products
 * */

export const getAllProductsHandler = function (){
    return new Response(201, {}, { products: this.db.products });
}

/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/user/products/:productId
 * */

export const getProductHandler =  function (schema, request) {
    const productId = request.params.productId;
    const product = this.db.products.findBy({_id: productId});
    return new Response(201, {}, { product });
}