/**
 * Pelicula.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "peliculas",

  attributes: {
    idPeli: {
      type: "integer",
      required: true
    },
    titulo: {
      type: "string",
      required: true,
      unique: true
    },
    sinopsis: {
      type: "string",
      required: true
    },
    imgen: {
      type: "integer",
      required: true
    },
    fechaLanzamiento: {
      type: "date",
      required: true
    },
    financiero: {
      type: "array",
    },
    origen: {
      type: "array",
    },
    popularidad: {
      type: "array",
    },
    genero: {
      type: "array",
    },
    compania: {
      type: "array",
    },
    casting: {
      type: "array",
    },
  }
};

