/**
 * chenmm
 * 2014/11/01
 * 菜谱routes
 */

var recipe = require('./../controller/recipeHandler');

//查询方法全都需要分页

module.exports = function (app) {
    app.get('/recipe/delete/:ids', recipe.deleteRecipe);
    app.get('/recipe/showOne/:id', recipe.showOne);

    app.get('/recipe/listOwn/:authorId', recipe.listOwn);
    app.get('/recipe/listAll', recipe.listAll);
    app.get('/recipe/search/:queryStr', recipe.searchRecipe);
    app.get('/recipe/listComment/:recipeId', recipe.listComment);
    app.get('/recipe/listProduct/:recipeId',recipe.listProduct);

    app.post('/recipe/create', recipe.create);
    app.post('/recipe/comment', recipe.comment);
    app.post('/recipe/modify', recipe.modify);
    app.post('/recipe/collect', recipe.collect);
    app.post('/recipe/createProduct', recipe.createProduct);
    app.post('/recipe/likeProduct', recipe.likeProduct);
    app.post('/recipe/upload', recipe.upload);

    //app.post('/recipe/share', recipe.share);
    //app.get('/recipe/showByStep/:id/:step', recipe.showByStep);
};
