import { Response} from "miragejs"
import { requiresAuth } from "../utils/authUtils";

export const getCartItemsHandler = function(schema, request) {
    const user = requiresAuth.call(this, request);
    if(user){
      return {cart: user.cart}
    }
  }

  export const addItemToCartHandler = function(schema, request) {
    const user = requiresAuth.call(this, request);
    if(user){
      const {product} = JSON.parse(request.requestBody);
      user.cart.push(product);
      return new Response(201, {}, {cart: user.cart} );
    }
    return new Response(401, { errors: [ 'The token is invalid. Unauthorized access error.'] });
  }

  export const removeItemFromCartHandler = function(schema, request) {
    const user = requiresAuth.call(this, request);
    if(user){
      const {product} = JSON.parse(request.requestBody);
      const filteredCart = user.cart.filter(item => item._id !== product._id);
      this.db.users.update({cart: filteredCart});
      return new Response(201, {}, {cart: filteredCart} );
    }
    return new Response(404, { errors: [ 'The user you request does not exist. Not Found error.'] });
  }

  export const updateCartItemHandler = function(schema, request) {
    const productId = request.params.productId;
    const user = requiresAuth.call(this, request);
    if(user){
      const {action} = JSON.parse(request.requestBody);
      if(action.type === "increment"){
          user.cart.forEach(product => {
              if(product._id === productId){
                  product.qty+=1
              }
          })
      }else if(action.type === "decrement"){
        user.cart.forEach(product => {
            if(product._id === productId){
                product.qty-=1
            }
        })
      }
      return new Response(201, {}, {cart: user.cart} );
    }
    return new Response(401, { errors: [ 'The token is invalid. Unauthorized access error.'] });
  }