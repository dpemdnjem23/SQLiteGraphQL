//**************************************************
// DATABASE SCHEMA GENERATION & DATA IMPORTS
//**************************************************
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import recipes from "./recipes.js";

// Handle for sqlite recipe database used in GRAPHQL
let db;

(async function () {
  db = await open({
    filename: "./recipes.db",
    driver: sqlite3.Database,
  });

  // Dropping table for reset every run
  await db.exec(`DROP TABLE IF EXISTS recipe`);

  // TODO: Complete table generation logic for table 'recipe'
  await db.exec(`CREATE TABLE recipe (
    id varchar(36) NOT NULL,
    cookingTime integer NOT NULL,
    description text NOT NULL,
    kcal integer NOT NULL,
    name text NOT NULL,
    picture text NOT NULL,
    servings integer NOT NULL,
    category text NOT NULL,
    PRIMARY KEY (id)
  )`);

  // TODO: Complete data import logic
  for (const recipe of recipes) {
   recipe.cookingSteps
   recipe.ingredients
    recipe.spices
    // cookingSteps text NOT NULL,spices, ingredinets
  }
})();

//**************************************************
// GRAPHQL SERVER IMPLEMENTATION
//**************************************************
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  # TODO: Step 3 - Add Recipe type
type Recipe{
  id:Number
  cookingTime:Number
  description:Strign
  kcal integer NOT NULL,
  name text NOT NULL,
  picture text NOT NULL,
  servings integer NOT NULL,
  category text NOT NULL,


}
  # TODO: Step 7 - Add RecipeInput input

  type Query {
    """
    Returns all recipes in a list, sorted by name ascending.
    If an optional argument 'category' is provided, 
    only return recipes with the specified category.
    """
    #TODO: Step 6 - Add recipes query

    "Returns a recipe with provided ID"
    recipeById(recipeId: ID!): Recipe!
  }

  type Mutation {
    """
    Add a new recipe to the database, then return newly added recipe.
    Takes one argument 'recipeInput' of type RecipeInput for
    the recipe. 
    """
    #TODO: Step 8 - Add addRecipe mutation
  }
`;

const resolvers = {
  // TODO: Step 4 - Implement Recipe resolver if necessary

  Query: {
    // TODO: Step 6 - Implement recipes resolver
    // TODO: Step 5 - Implement recipeById resolver
  },

  Mutation: {
    // TODO: Step 8 - Implement addRecipe resolver
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(({ url }) => console.log("Apollo GraphQL Server ready at", url));
