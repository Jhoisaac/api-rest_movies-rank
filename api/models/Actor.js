/**
 * Actor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "actores",

  attributes: {
    nombre: {
      type: "string",
      required: true,
      unique: true
    },
    contenido: {
      type: "string",
      required: true
    },
    num: {
      type: "integer",
      required: true
    },
    imagen: {
      type: "string",
      required: true
    },
    calificacion: {
      type: "string",
      required: true
    }
  }
};

