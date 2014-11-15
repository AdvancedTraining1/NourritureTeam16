/*
 * chenmm
 * 2014/11/01
 * 收藏菜谱数据访问类
 */

var DaoBase = require('./DaoBase'),
    CollectModel = require('./../data').CollectRecipe;

var CollectDao = new DaoBase(CollectModel);

module.exports = CollectDao;
