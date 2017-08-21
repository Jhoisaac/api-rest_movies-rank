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
    var jsondoc={
      idPeli:0,
      titulo:"",
      sinopsis:"",
      imgen:"",
      fechaLanzamiento:"",
      financiero:{
        presupuesto:0,
        ingresos:0
      },
      origen:{
        idioma:"",
        pais:[]
      },
      popularidad:{
        votos:0,
        views:0,
        reviews:0,
      },
      genero:[],
      companias:[],
      casting:[]
    };
  },


  /**
   * `DirectorController.update()`
   */
  update: function (req, res) {
    https.get(peliJsonUrl,function(res) {
      var output = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        output += chunk;
      });

      res.on('end', function() {
        var peliCasringJsonUrl=urApi+'/movie/'+idPelicula+'/credits?api_key='+apiKey;

        var obj = JSON.parse(output);
        jsondoc.idPeli=obj.id;
        jsondoc.titulo=obj.original_title;
        jsondoc.sinopsis=obj.overview;
        jsondoc.imgen=urlImg+obj.poster_path;
        jsondoc.fechaLanzamiento=obj.release_date;
        jsondoc.financiero.presupuesto=obj.budget;
        jsondoc.financiero.ingresos=obj.revenue;
        jsondoc.origen.idioma=obj.original_language;
        jsondoc.origen.pais=obj.production_countries;
        jsondoc.popularidad.votos=obj.vote_count;
        jsondoc.popularidad.views=obj.popularity;

        jsondoc.genero=obj.genres;
        jsondoc.companias=obj.production_companies;

        https.get(peliCasringJsonUrl,function(res){
          var output = '';
          res.setEncoding('utf8');

          res.on('data', function (chunk) {
            output += chunk;
          });
          res.on('end', function() {
            var obj = JSON.parse(output);

            for (var i=0;i<10;i++){
              jsonCast.personaje=obj.cast[i].character;
              console.log("cast"+obj.cast[i].id);
              https.get(urApi+'/person/'+obj.cast[i].id+'?api_key='+apiKey,function(res){
                var outputcast = '';
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                  outputcast += chunk;
                });
                res.on('end', function() {
                  var obj = JSON.parse(outputcast);
                  jsonCast.idActor=obj.id;
                  jsonCast.nombre=obj.name;
                  jsonCast.imgActor='https://image.tmdb.org/t/p/w1280/'+obj.profile_path;
                  jsonCast.genero=obj.gender;
                  jsonCast.popularidad=obj.popularity;
                  jsonCast.nacimiento.fecha=obj.birthday;
                  jsonCast.nacimiento.lugar=obj.place_of_birth;
                  jsonCast.fechaDefuncion=obj.deathday;
                  jsondoc.casting.push(jsonCast);
                  console.log(i);
                  if(i==9){
                    console.log(jsondoc);
                  }

                });
              });
              console.log("castid"+i)
            }

          });
        });


      });
    });
  }
};

