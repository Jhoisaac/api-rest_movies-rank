/**
 * PeliculaController
 *
 * @description :: Server-side logic for managing Peliculas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `PeliculaController.create()`
   */
  create: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },


  /**
   * `PeliculaController.findALL()`
   */
  findAll: function (req, res) {
    // Valida si el request no fue hecho por GET
    if(req.method !== 'GET') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    Pelicula.find()
      .then( (_peliculas) => {
        console.log('Consultado peliculas');
        if (!_peliculas || _peliculas.length === 0) return res.badRequest({ err: 'No hay peliculas registradas :(' });
        return res.ok(_peliculas);
      }).catch( (err) => {
      res.serverError(err.message);
    });
  },


  /**
   * `PeliculaController.findOne()`
   */
  findOne: function (req, res) {
    // Valida si el request no fue hecho por GET
    if(req.method !== 'GET') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    // Obtiene el id enviado en el request
    let peliculaId = req.params.id;
    // Verifica que los valores recibidos no esten vacios
    if (!peliculaId) return res.badRequest({ err: 'Pelicula id esta ausente' });

    Pelicula.findOne({
      id: peliculaId
    })  //.populate('pedidos')
      .then( (_pelicula) => {
        if (!_pelicula || _pelicula.length === 0) return res.badRequest({ err: 'Ningúna Pelicula encontrado :(' });
        return res.ok(_pelicula);
      }).catch( (err) => {
      res.serverError(err.message);
    });
  },


  /**
   * `PeliculaController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  },


  /**
   * `PeliculaController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }
};

