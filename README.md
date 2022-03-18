
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