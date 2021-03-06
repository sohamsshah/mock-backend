import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
const jwt = require("jsonwebtoken");

/**
 * All the routes related to Auth are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles user signups.
 * send POST Request at /api/auth/signup
 * body contains {firstName, lastName, email, password}
 * */

export const signupHandler = function(schema, request) {
  const { email, password, firstName, lastName } = JSON.parse(
    request.requestBody
  );
  // TODO: Add check if email already exists
  const newUser = {
    liked: [],
    email,
    firstName,
    lastName,
    password,
    _id: uuid(),
  };
  const createdUser = schema.users.create(newUser);
  const encodedToken = jwt.sign(
    { email, password },
    process.env.REACT_APP_JWT_SECRET
  );
  return new Response(201, {}, { createdUser, encodedToken });
};

/**
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {email, password}
 * */

export const loginHandler = function(schema, request){
  const { email, password } = JSON.parse(request.requestBody);
  const encodedToken = jwt.sign(
    { email, password },
    process.env.REACT_APP_JWT_SECRET
  );
  const foundUser = schema.users.findBy({ email: email });
  if (foundUser) {
    if (foundUser.password === password) {
      return new Response(201, {}, { foundUser, encodedToken });
    }
    return new Response(404, {
      errors: ["The email you entered is not Registered. Not Found error"],
    });
  }
  return new Response(401, {
    errors: [
      "The credentials you entered are incorrect. Unauthorized access error.",
    ],
  });
};

/**
 * This handler handles user logout.
 * send POST Request at /api/auth/logout
 * */

 export const logoutHandler = function(schema, request){
  try{
    localStorage.removeItem("token");
    return new Response(200, {
      errors: [
        "Successfully logged out",
      ],
    });
  }catch{
    return new Response(404, {
      errors: [
        "Something went wrong. Please try again.",
      ],
    });
  }
  
};
