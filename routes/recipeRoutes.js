/**
 * Created with JetBrains WebStorm.
 * User: c-sailor.zhang
 * Date: 1/23/13
 * Time: 1:47 PM
 * To change this template use File | Settings | File Templates.
 */

var recipe = require('./recipe');

module.exports = function (app) {
    /*app.get('/recipe/create', recipe.index);
    app.get('/recipe/create/upload', recipe.upload);
    app.get('/recipe/modify', recipe.modify);
    app.get('/recipe/delete', recipe.deletes);
    app.post('/recipe/listOwn', recipe.listOwn);*/
    app.get('/recipe/listAll', recipe.listAll);
    /*app.get('/recipe/showOne', recipe.showOne);
    app.get('/recipe/showByStep', recipe.showByStep);
    app.get('/recipe/search', recipe.searchs);
    app.get('/recipe/comment', recipe.comment);
    app.get('/recipe/listComment', recipe.listComment);
    app.get('/recipe/collect', recipe.collect);
    app.get('/recipe/share', recipe.share);
    app.get('/recipe/praise', recipe.praise);
    app.get('/recipe/listPraise', recipe.listPraise);*/
};
