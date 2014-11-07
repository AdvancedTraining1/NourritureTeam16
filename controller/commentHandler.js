/**
 * Created by huhao on 14-11-06.
 */

var commentModel = require('../data').comment;
var CommentDao = require("../dao/CommentDao");

//构造
function CommentHandler()
{

}

CommentHandler.delete = function(req,res)
{
    req.on('data',function(data)
    {
        var conditions ={author : {account:"amount111"}};
        var obj = JSON.parse(data.toString());
        CommentDao.delete(conditions,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);
            }

        });
        res.send(obj.userid);

    });

}

function createComment()
{
    var comment = new commentModel();
    var author = [];
    author[0] = {id:120,account:"amount111"};
    comment.author = author;
    comment.time = new Date();
    comment.update_at = new Date();
    return comment;
};

module.exports = CommentHandler;
