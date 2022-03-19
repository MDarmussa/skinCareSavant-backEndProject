
- login form: https://bootsnipp.com/snippets/z1Bpy
- Templates Resources: https://www.bestjquery.com/lab/forms/ 
- Templates Resources: https://bbbootstrap.com/snippets/bootstrap-4-simple-mcq-step-form-dark-mode-78032154
- skincare: https://codepen.io/_elletownsend/pen/QWLpGYw
- Quiz: https://codepen.io/lei_mobley/pen/LYxEWjM

- How to ADD giphy images
<img src="https://media0.giphy.com/media/H1BWteEWGmSlbNUcTk/giphy-downsized.gif?cid=646febc5da0b63c9a36408ca225237b11ea0c1180b7d17b0&rid=giphy-downsized.gif" alt="funny GIF" height="25%" width="25%">
<img src="https://media.giphy.com/media/5vhZtUPLrue1wWwdYe/giphy.gif" alt="funny GIF" height="25%" width="25%"> 

 
- Tables/model/migration related:
  npx sequelize-cli model:generate --name Product --attributes url:string
  npx sequelize-cli db:migrate


- Loop over API's ingredients
  let ingredients = '';
  for (let i=0; i < (product.data.brandIngredients.length; i++)) {
    ingredients += (product.data.brandIngredients[i]);
    console.log(ingredients)
  }',

- Looping over Array / JSON
  https://www.microverse.org/blog/how-to-loop-through-the-array-of-json-objects-in-javascript
      

          // brandIngredients: 
      // `<ul>
      //     <li>${products.data.brandIngredients[0]}</li>
      //     <li>${products.data.brandIngredients[1]}</li>
      //     <li>${products.data.brandIngredients[2]}</li>
      //     <li>${products.data.brandIngredients[3]}</li>
      //     <li>${products.data.brandIngredients[4]}</li>
      //     <li>${products.data.brandIngredients[5]}</li>
      //     <li>${products.data.brandIngredients[6]}</li>
      // </ul`
    brand: DataTypes.STRING,
    productName: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    skintype_id: DataTypes.INTEGER

      npx sequelize-cli model:generate --name Product --attributes brand:string,productName:string,ingredients:string,url:string,skintype_id:integer





      midgration file/product -------------
      'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand: {
        type: Sequelize.STRING
      },
      productName: {
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.STRING
      },
      skintype_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Skintype",
          key: "id",
          as: "skintype_id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};



model file / product ---------------
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Skintype, {
        foreignKey: 'skintype_id',
        onDelete: 'CASCADE'
      });
    }
  }
  Product.init({
    brand: DataTypes.STRING,
    productName: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    skintype_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};






// Post the API into our db //cancel
// router.get('/product/:id', async function(req, res, next) {
//   const { id } = req.params

//   //get from product table based on skin_id

//   var config = {
//     method: 'get',
//     url: `https://skincare-api.herokuapp.com/products/${id}`,
//     headers: { },
//   };

//   //render(GET) products from product table to the profile page, then update the user profile with recommended products (note)

//   const products = await axios(config)
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//     console.log(products)
//     const addProduct = await product.create({
//       user_id:id,
//       brand: products.brand,
//       productName: products.name,
//       ingredients: products.ingredient_list
//     })
//     res.json('product added', addProduct)
// });

//router to get product based on user id
//







/* GET Profile */
// router.post('/quiz', async (req, res) => {
//   const {q1, q2, q3} = req.body;
//   const quizData = await Quiz.create({
//     question1: q1,
//     question2: q2,
//     question3: q3
//   })
//   add logic to do math (if statement)
//   const quizResult = (q1+q2+q3);
//   switch (quizResult) {
//     case `(quizResult / 3) < 3)`:
//       res.send(`/profile/ You have a dry skin `);
//       break;
//     case `(quizResult / 3) < 7)`:
//       res.send(`/profile/ You have a normal skin `)
//       break;
//     default:
//       res.send(`/profile/ You have a Oily skin `)
//   }
// })
  // const quizData = await Quiz.create({
  //   question1: q1,
  //   question2: q2,
  //   question3: q3
  // })
  //add logic to do math (if statement)
/* GET Profile */




//POST Product to SQL Table //admin use only for posting
// router.post('/products', async (req, res) => {
//   const { brand, productName, ingredients, url } = req.body;
//   const addItem = await Product.create({
//     brand: brand,
//     productName:productName,
//     ingredients: ingredients,
//     url:url
//   });
//   console.log("The new product is: " + addItem)
//   res.json(addItem);
// })








