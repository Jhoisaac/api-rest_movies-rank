/**
 * ComentariosController
 *
 * @description :: Server-side logic for managing Comentarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `ComentariosController.create()`
   */
  create: function (req, res) {
    // Valida si el request no fue hecho por POST
    if(req.method !== 'POST') return res.forbidden('Metodo no permitido!');
    // Obtiene los datos enviados en el formulario
    let parametros = req.params.all();
    // Verifica que los valores recibidos no esten vacios
    if(!parametros.usuario) return res.badRequest({err: 'usuario invalido!'});
    if(!parametros.contenido) return res.badRequest({err: 'contenido invalido!'});
    if(!parametros.pelicula) return res.badRequest({err: 'pelicula invalido!'});
    console.dir(parametros);
    // Ejecuta el model method para crear el objeto cliente y guardarlo en la base
    Pelicula.find({
      id: parametros.pelicula
    }).then( (_pelicula) => {
      console.dir(_pelicula);
      if(!_pelicula) return res.serverError({err:'No existe esa categoria :('});
      return _pelicula;

    }).then( (_pelicula) => {
      return Comentario.create({
        usuario: parametros.usuario,
        contenido: parametros.contenido,
        pelicula: _pelicula[0].id,
      });
    }).then( (_comentario) => {
      if(!_comentario) return res.serverError({err:'Incapas de crear el comentario! :('});
      console.log('Se creo el comentario: ', _comentario);
      // NOTE: payload is { id: user.id}
      res.json( 201, { comentario: _comentario } );
      //return res.created('Usuario registrado exitosamente! :)', _usuario);
    }).catch( (err) => {
      res.serverError(err.message)
    });
  },


  /**
   * `ComentariosController.findALL()`
   */
  findAll: function (req, res) {
    // Valida si el request no fue hecho por GET
    if(req.method !== 'GET') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    Comentario.find()
      .then( (_comentarios) => {
        if (!_comentarios || _comentarios.length === 0) return res.badRequest({ err: 'No hay Comentarios registradas :(' });
        return res.ok(_comentarios);
      }).catch( (err) => {
      res.serverError(err.message);
    });
  },


  /**
   * `ComentariosController.findOne()`
   */
  findOne: function (req, res) {
    // Valida si el request no fue hecho por GET
    if(req.method !== 'GET') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    // Obtiene el id enviado en el request
    let comentarioId = req.params.id;
    // Verifica que los valores recibidos no esten vacios
    if (!comentarioId) return res.badRequest({ err: 'Comentario id esta ausente' });

    Comentario.findOne({
      id: comentarioId
    }).populate('pelicula')
      .then( (_comentario) => {
        if (!_comentario || _comentario.length === 0) return res.badRequest({ err: 'Ningún Comentario encontrado :(' });
        return res.ok(_comentario);
      }).catch( (err) => {
      res.serverError(err.message);
    });
  },


  /**
   * `ComentariosController.delete()`
   */
  delete: function (req, res) {
    // Valida si el request no fue hecho por DELETE
    if(req.method !== 'DELETE') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    // Obtiene el id enviado en el request
    let comentarioId = req.params.id;
    // Verifica que los valores recibidos no esten vacios
    if (!comentarioId) return res.badRequest({ err: 'Comentario id esta ausente' });
    // Ejecuta el model method para crear el objeto cliente y guardarlo en la base
    Comentario.destroy({
      id: comentarioId
    }).then( (_comentario) => {
      if (!_comentario || _comentario.length === 0) return res.notFound({ err: 'Usuario no encontrado en los registros' });
      console.log('Se eliminó el usuario: ', _comentario);
      //return res.ok({msg:`Post is deleted with id ${productoId}`});
      return res.ok({msg:'usuario borrado con id: ' + _comentario});
    }).catch( (err) => {
      res.serverError(err.message);
    });
  },


  /**
   * `ComentariosController.update()`
   */
  update: function (req, res) {
    // Valida si el request no fue hecho por PUT
    if(req.method !== 'PUT') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    // Obtiene los datos enviados en el formulario
    let parametros = req.params.all();
    // Verifica que los valores recibidos no esten vacios
    if (!req.params.id) return res.badRequest({ err: 'Comentario id esta ausente' });
    // Crea un objeto
    let comentario = {};
    // Obtiene los nuevos atributos a actualizar
    if(parametros.usuario) comentario.usuario = parametros.usuario;
    if(!parametros.contenido) comentario.contenido = parametros.contenido;
    if(parametros.pelicula) comentario.pelicula = parametros.pelicula;
    // Ejecuta el model method para crear el objeto cliente y guardarlo en la base
    Comentario.update(
      { id: req.params.id },
      comentario
    ).then(function(_comentario) {
      if (!_comentario[0] || _comentario[0].length === 0) return res.notFound({ err: 'Comentario no encontrado!' });
      console.log('Se actualizó el comentario: ', _comentario);
      return res.ok(_comentario[0]);
    }).catch(function(err) {
      res.serverError(err.message)
    });
  }
};

