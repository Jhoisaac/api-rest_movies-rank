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
    console.log('Endpoint query param findAll');
    let limit = req.query.limit;
    let skip = req.query.skip;

    Pelicula.find({ limit: limit, skip: skip }).sort('idPeli ASC').populate('comentarios')
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
    console.log('Endpoint query param findOne');
    //Query Params
    let queryString = req.query.q;
    let limite = req.query.limite;
    if (!limite) limite = 20;
    console.dir(req.query);

    //Query Params
    if(queryString === 'masrecientes') {
      Pelicula.find().populate('comentarios')
        .sort('fechaLanzamiento DESC').limit(limite)  //.populate('pedidos')
        .then( (_pelicula) => {
          if (!_pelicula || _pelicula.length === 0) return res.badRequest({ err: 'Ningúna Pelicula encontrado :(' });
          return res.ok(_pelicula);
        }).catch( (err) => {
        res.serverError(err.message);
      });

      return;

    } else if(queryString === 'masvisitadas') {
      Pelicula.find().populate('comentarios')
        .sort('popularidad[votos] DESC').limit(limite)
        .then( (_pelicula) => {
          if (!_pelicula || _pelicula.length === 0) return res.badRequest({ err: 'Ningúna Pelicula encontrado :(' });
          return res.ok(_pelicula);
        }).catch( (err) => {
        res.serverError(err.message);
      });

      return;

    } else if(queryString === 'mayorpresupuesto') {
      Pelicula.find().populate('comentarios')
        .sort('financiero[presupuesto] DESC').limit(limite)  //.populate('pedidos')
        .then( (_pelicula) => {
          if (!_pelicula || _pelicula.length === 0) return res.badRequest({ err: 'Ningúna Pelicula encontrado :(' });
          return res.ok(_pelicula);
        }).catch( (err) => {
        res.serverError(err.message);
      });

      return;

    } else if(queryString === 'presupuesto') {
      let presupuesto = req.query.presupuesto;
      let ingresos = req.query.ingresos;

      Pelicula.find({
        financiero: {
          presupuesto: presupuesto
        },
        financiero: {
          ingresos: ingresos
        },
      }).populate('comentarios')
        .sort('financiero[presupuesto] DESC')
        .then( (_pelicula) => {
          if (!_pelicula || _pelicula.length === 0) return res.badRequest({ err: 'Ningúna Pelicula encontrado :(' });
          return res.ok(_pelicula);
        }).catch( (err) => {
        res.serverError(err.message);
      });

      return;

    } else if(queryString === 'peliculasxidiomas') {
      console.log('en peliculasxidiomas... antes de retornar');
      Pelicula.find({"origen.idioma": "en"}).populate('comentarios').limit(5)
        .then( (_peliculaen) => {
          if (!_peliculaen || _peliculaen.length === 0) return res.badRequest({ err: 'Ningúna Pelicula encontrado :(' });
          return res.ok(_peliculaen);
        }).catch( (err) => {
        res.serverError(err.message);
      });

      return;
    }

    console.log(queryString);
    // Obtiene el id enviado en el request
    let peliculaId = req.params.id;
    // Verifica que los valores recibidos no esten vacios
    if (!peliculaId) return res.badRequest({ err: 'Pelicula id esta ausente' });

    Pelicula.findOne({
      id: peliculaId
    }).populate('comentarios')
      .then( (_pelicula) => {
        if (!_pelicula || _pelicula.length === 0) return res.badRequest({ err: 'Ningúna Pelicula encontrado :(' });
        return res.ok(_pelicula);
      }).catch( (err) => {
      res.serverError(err.message);
    });
  },


  /**
   * `PeliculaController.findMasReciente()`
   */
  findMasReciente: function (req, res) {
    // Valida si el request no fue hecho por GET
    if(req.method !== 'GET') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    // Obtiene el id enviado en el request
    console.log('Endpoint query param findMasReciente');
    let queryString = req.query.q;
    console.log(queryString);
    // Verifica que los valores recibidos no esten vacios
    if (!queryString) return res.badRequest({ err: 'Query esta ausente' });

    Pelicula.findOne({
      sort: 'fechaLanzamiento ASC'
    }).populate('comentarios')
      .then( (_pelicula) => {
        if (!_pelicula || _pelicula.length === 0) return res.badRequest({ err: 'Ningúna Pelicula encontrado :(' });
        return res.ok(_pelicula);
      }).catch( (err) => {
      res.serverError(err.message);
    });
  },


  /**
   * `PeliculaController.findPresupuestoXPopularidad()`
   */
  findPresupuestoXPopularidad: function (req, res) {
    // Valida si el request no fue hecho por GET
    if(req.method !== 'GET') {
      console.dir(req.method);
      console.log('Es metodo no permitido!');
      return res.forbidden('Metodo no permitido!');
    }
    console.log('Endpoint query param findPresupuestoXPopularidad');
    // Obtiene el id enviado en el request
    let peliculaId = req.params.id;
    // Verifica que los valores recibidos no esten vacios
    if (!peliculaId) return res.badRequest({ err: 'Pelicula id esta ausente' });

    Pelicula.findOne({
      financiero: {
        presupuesto: 175000000
      },
      popularidad: peliculaId,
      sort: 'popularidad ASC'
    }).populate('comentarios')
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

