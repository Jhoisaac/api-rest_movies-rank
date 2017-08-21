/**
 * Comentario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "comentarios",

  attributes: {
    usuario: {
      type: "string",
      required: true,
      unique: true
    },
    contenido: {
      type: "text",
      required: true,
      unique: true
    },
    // Many to One
    pelicula: {
      model: "pelicula",
      columnName: "pelicula_id",
      required: true
    }
  }
};

