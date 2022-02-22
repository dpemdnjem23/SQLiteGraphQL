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

import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`



type Recipe {
  id: String!
  cookingTime:Int
  cookingSteps:[String]
spices:[String]
description:String
name:String
picture:String
ingredients:[String]
servings:Int
category:String
}

input RecipeInput{
  id: String!
  cookingTime:Int
  cookingSteps:[String]
spices:[String]
description:String
name:String
picture:String
ingredients:[String]
servings:Int
category:String

}


   type Query {
     Recipe:[Recipe]
 recipes(category:String):[Recipe]
 recipeById(id: String!): Recipe

   }

  
    type Mutation {

      AddRecipe(recipe:RecipeInput):Recipe
     }



 `;
const resolvers = {




  Query: {
Recipe:() => recipes,
  

    recipes: (parent,args,context,info) =>{
      //name으로 sort하기
      const categoryRecipe = recipes.filter((el)=>{
        return el.category===args.category
      })

      categoryRecipe.sort((a,b)=>{
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0      

      })
  
      //카테고리가 없는 경우
      if(categoryRecipe.length===0){
        recipes.sort((a,b)=>{
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0      
  
        })


        return recipes
      }
      //카테고리가 있는경우
    return categoryRecipe

    }
,
    


    recipeById: (parent,args,context,info) => {
     
    const byId = recipes.find((recipe)=>recipe.id ===args.id)
  

        return byId
      



    }

    },

    Mutation: {
      AddRecipe: (parent,args) =>{
  
     
        const inputData = args.recipe
        console.log(inputData)
        recipes.push(inputData)
        return inputData
      }

      
// 
    },





};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(({ url }) => console.log("Apollo GraphQL Server ready at", url));
