const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id : {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type : DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT
    },
    background_image: {
      type: DataTypes.STRING,
      
    },
    inBd:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true 
    }
  },{
    timestamps: false
  });
};
