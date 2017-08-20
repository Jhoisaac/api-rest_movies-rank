/**
 * DirectorController
 *
 * @description :: Server-side logic for managing Directors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `DirectorController.create()`
   */
  create: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },


  /**
   * `DirectorController.findALL()`
   */
  findAll: function (req, res) {
    // Valida si el request no fue hecho por GET
    if(req.method !== 'GET') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    Director.find()
      .then( (_directores) => {
        console.log('Consultado directores');
        if (!_directores || _directores.length === 0) return res.badRequest({ err: 'No hay actores registrados :(' });
        return res.ok(_directores);
      }).catch( (err) => {
      res.serverError(err.message);
    });
  },


  /**
   * `DirectorController.findOne()`
   */
  findOne: function (req, res) {
    // Valida si el request no fue hecho por GET
    if(req.method !== 'GET') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    // Obtiene el id enviado en el request
    let directorId = req.params.id;
    // Verifica que los valores recibidos no esten vacios
    if (!directorId) return res.badRequest({ err: 'Director id esta ausente' });

    Director.findOne({
      id: directorId
    })  //.populate('pedidos')
      .then( (_director) => {
        if (!_director || _director.length === 0) return res.badRequest({ err: 'Ningún Director encontrado :(' });
        return res.ok(_director);
      }).catch( (err) => {
      res.serverError(err.message);
    });
  },


  /**
   * `DirectorController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  },


  /**
   * `DirectorController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }
};

