/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  //actor
  'POST /api/categoria': 'CategoriaController.create',
  'GET /api/categorias': 'CategoriaController.findAll',
  'GET /api/categoria/:id': 'CategoriaController.findOne',
  'DELETE /api/categoria/:id': 'CategoriaController.delete',
  'PUT /api/categoria/:id': 'CategoriaController.update',

  //comentario
  'POST /api/producto': 'ProductoController.create',
  'GET /api/productos': 'ProductoController.findAll',
  'GET /api/producto/:id': 'ProductoController.findOne',
  'DELETE /api/producto/:id': 'ProductoController.delete',
  'PUT /api/producto/:id': 'ProductoController.update',

  //company
  'POST /api/tipo': 'TipoController.create',
  'GET /api/tipos': 'TipoController.findAll',
  'GET /api/tipo/:id': 'TipoController.findOne',
  'DELETE /api/tipo/:id': 'TipoController.delete',
  'PUT /api/tipo/:id': 'TipoController.update',

  //director
  'POST /api/menu': 'MenuController.create',
  'GET /api/menus': 'MenuController.findAll',
  'GET /api/menu/:id': 'MenuController.findOne',
  'DELETE /api/menu/:id': 'MenuController.delete',
  'PUT /api/menu/:id': 'MenuController.update',

  //pelicula
  'POST /api/cliente': 'ClienteController.create',
  'GET /api/clientes': 'ClienteController.findAll',
  'GET /api/cliente/:id': 'ClienteController.findOne',
  'DELETE /api/cliente/:id': 'ClienteController.delete',
  'PUT /api/cliente/:id': 'ClienteController.update',

  //popularidad
  'POST /api/usuario': 'UsuarioController.create',
  'GET /api/usuarios': 'UsuarioController.findAll',
  'GET /api/usuario/:id': 'UsuarioController.findOne',
  'DELETE /api/usuario/:id': 'UsuarioController.delete',
  'PUT /api/usuario/:id': 'UsuarioController.update'
};
