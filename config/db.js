require("dotenv").config();
const { Sequelize } = require("sequelize");

const entidadesModel = require("../models/entidades");
const marcasModel = require("../models/marcas");
const modelosModel = require("../models/modelos");
const placasModel = require("../models/placas");
const propietariosModel = require("../models/propietarios");
const rolesModel = require("../models/roles");
const usuariosModel = require("../models/usuarios");
const vehiculosModel = require("../models/vehiculos");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const models = [
  entidadesModel,
  marcasModel,
  modelosModel,
  placasModel,
  propietariosModel,
  rolesModel,
  usuariosModel,
  vehiculosModel,
];

for (let model of models) model(sequelize);

// Configuring relations
const {
  entidades,
  marcas,
  modelos,
  placas,
  propietarios,
  roles,
  usuarios,
  vehiculos,
} = sequelize.models;

// // One to much
// roles.hasMany(usuarios);
// usuarios.belongsTo(roles);
// entidades.hasMany(placas);
// placas.belongsTo(entidades);
// marcas.hasMany(modelos);
// modelos.belongsTo(marcas);
// propietarios.hasMany(vehiculos);
// vehiculos.belongsTo(propietarios);
// modelos.hasMany(vehiculos);
// vehiculos.belongsTo(modelos);
// // one to one
// placas.hasOne(vehiculos);
// vehiculos.belongsTo(placas);


module.exports = sequelize;
