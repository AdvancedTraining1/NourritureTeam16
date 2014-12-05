/**
 * chenmm
 * 2014/11/01
 * 菜谱routes
 */

var recipe = require('./../controller/recipeHandler');

//查询方法全都需要分页

module.exports = function (app) {

    app.get('/recipe/create', function(req,res){
        res.render("recipe/createRecipe");
    });
    app.get('/recipe/list', function(req,res){
        res.render("recipe/listRecipe");
    });
    app.get('/recipe/single', function(req,res){
        res.render("recipe/singleRecipe");
    });

    app.get('/service/recipe/delete/:ids', recipe.deleteRecipe);
    app.get('/service/recipe/showOne/:id', recipe.showOne);

    app.get('/service/recipe/listOwn/:authorId', recipe.listOwn);
    app.get('/service/recipe/listAll', recipe.listAll);
    app.get('/service/recipe/search', recipe.searchRecipe);
    app.get('/service/recipe/listComment/:recipeId', recipe.listComment);
    app.get('/service/recipe/listProduct/:recipeId',recipe.listProduct);

    app.post('/service/recipe/create', recipe.create);
    app.post('/service/recipe/comment', recipe.comment);
    app.post('/service/recipe/modify', recipe.modify);
    app.post('/service/recipe/collect', recipe.collect);
    app.post('/service/recipe/createProduct', recipe.createProduct);
    app.post('/service/recipe/likeProduct', recipe.likeProduct);
    app.post('/service/recipe/upload', recipe.upload);

    //app.post('/recipe/share', recipe.share);
    //app.get('/recipe/showByStep/:id/:step', recipe.showByStep);
};
