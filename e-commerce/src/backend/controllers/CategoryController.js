import { Response } from "miragejs";

/**
 * All the routes related to Category are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all categories in the db.
 * send GET Request at /api/categories
 * */

export const getAllCategoriesHandler = function (){
    return new Response(201, {}, { categories: this.db.categories });
}

/**
 * This handler handles gets all categories in the db.
 * send GET Request at /api/user/category/:categoryId
 * */

export const getCategoryHandler =  function (schema, request) {
    const categoryId = request.params.categoryId;
    const category = this.db.categories.findBy({_id: categoryId});
    return new Response(201, {}, { category });
}