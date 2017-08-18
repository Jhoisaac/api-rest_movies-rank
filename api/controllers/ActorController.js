/**
 * ActorController
 *
 * @description :: Server-side logic for managing Actors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `ActorController.create()`
   */
  create: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },


  /**
   * `ActorController.findALL()`
   */
  findAll: function (req, res) {
    // Valida si el request no fue hecho por GET
    if(req.method !== 'GET') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    Actor.find()
      .then( (_actores) => {
        if (!_actores || _actores.length === 0) return res.badRequest({ err: 'No hay actores registrados :(' });
        return res.ok(_actores);
      }).catch( (err) => {
      res.serverError(err.message);
    });
  },


  /**
   * `ActorController.findOne()`
   */
  findOne: function (req, res) {
    // Valida si el request no fue hecho por GET
    if(req.method !== 'GET') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    // Obtiene el id enviado en el request
    let productoId = req.params.id;
    // Verifica que los valores recibidos no esten vacios
    if (!productoId) return res.badRequest({ err: 'Producto id esta ausente' });

    Producto.findOne({
      id: productoId
    }).populate('categoria')
      .then(function(_producto) {
        if (!_producto || _producto.length === 0) return res.badRequest({ err: 'Ningún producto encontrado :(' });
        return res.ok(_producto);
      }).catch(function(err) {
      res.serverError(err.message);
    });
  },


  /**
   * `ActorController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  },


  /**
   * `ActorController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }
};

