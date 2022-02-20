//**************************************************
// DATABASE SCHEMA GENERATION & DATA IMPORTS
//**************************************************
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import recipes from "./recipes.js";

// Handle for sqlite recipe database used in GRAPHQL
let db;

(async  () =>{
  db = await open({
    filename: "./recipes.db",
    driver: sqlite3.Database,
  });

  // Dropping table for reset every run
  await db.exec(`DROP TABLE IF EXISTS recipe`);

  // TODO: Complete table generation logic for table 'recipe'
  
  await db.exec(`CREATE TABLE recipe (
    id varchar(36) NOT NULL ,
    cookingTime integer NOT NULL,
    cookingSteps text NOT NULL,
    description text NOT NULL,
    spices text NOT NULL,
    ingredients NOT NULL,
    kcal integer NOT NULL,
    name text NOT NULL,
    picture text NOT NULL,
    servings integer NOT NULL,
    category text NOT NULL,
    PRIMARY KEY  (id)

  )`);

  // TODO: Complete data import logic
  //데이터를 넣는다.
  for (const recipe of recipes) {



await db.run(`INSERT INTO recipe(id,cookingTime,cookingSteps,description,spices,ingredients,kcal,name,picture,servings,category) 
VALUES (?,?,?,?,?,?,?,?,?,?,?)`,recipe.id, recipe.cookingTime,recipe.cookingSteps,recipe.description,recipe.spices,recipe.ingredients,
recipe.kcal,recipe.name, recipe.picture,recipe.servings,recipe.category
)
  }
} )();
// # TODO: Step 3 - Add Recipe type



// }

// recipe(id:ID!):Recipe
//**************************************************
// GRAPHQL SERVER IMPLEMENTATION
//**************************************************
import { ApolloServer, gql } from "apollo-server";



const typeDefs = gql`

type Recipe{
  id:String!
  cookingTime:Int!
  cookingSteps:[String]!
spices:[String]!
description:String!
name:String!
picture:String!
ingredients:[String]!
servings:Int!
category:String!
}

   type Query {
 recipes:[Recipe]
 recipeById(id: ID!): Recipe



   }
 
 `;
// / # TODO: Step 7 - Add RecipeInput input


//   """
//   Returns all recipes in a list, sorted by name ascending.
//   If an optional argument 'category' is provided, 
//   only return recipes with the specified category.
//   """
//   오름차순 정렬도니 목록의 모든 조리법을 반환
//   category가 있다면 지정도니 카테코리의 레시피만 반환한다.

//   #TODO: Step 6 - Add recipes query

//   "Returns a recipe with provided ID"
//   recipeById(recipeId: ID!): Recipe!
// }

// type Mutation {
//   """
//   Add a new recipe to the database, then return newly added recipe.
//   Takes one argument 'recipeInput' of type RecipeInput for
//   the recipe. 
//   """
//   #TODO: Step 8 - Add addRecipe mutation
// }
const resolvers = {

  Recipe:{
    id:(parent,args) =>{
      console.log(parent.id)
      return parent.id
    },
    cookingTime:(parent,args) =>{
      return parent.cookingTime
    },
    cookingSteps:(parent,args) =>{
      return parent.cookingSteps
    }
  // spices:[String]!
  // description:String!
  // name:String!
  // picture:String!
  // ingredients:[String]!
  // servings:Int!
  // category:String!

  },


  // TODO: Step 4 - Implement Recipe resolver if necessary

  Query: {
    recipes: () =>recipes,

    


    recipeById: (parent,args,context,info) => {
     
    const byId =   recipes.find((recipe)=>recipe.id ===args.id)

    console.log(byId.id===args.id)
      if(byId.id===args.id){
        console.log
        return byId
      }


      
      // return 


    }

    },
  
    // TODO: Step 6 - Implement recipes resolver
    // TODO: Step 5 - Implement recipeById resolver
  // },

  // Mutation: {
  //   // TODO: Step 8 - Implement addRecipe resolver
  // },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(({ url }) => console.log("Apollo GraphQL Server ready at", url));
