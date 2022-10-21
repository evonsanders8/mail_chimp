const express = require('express');
const {createComment,
    createUser,
    deleteComment,
    getAllComments,
    getAllUsers,
    getSingleComment,
} = require('server/db/utils.js')

const {getAllUserRouter,getCommentRouter,getAllCommentsRouter, createCommentRouter, deleteCommentRouter} = express.Router()

getAllUserRouter.get('/', async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        res.send(allUsers)
    } catch (error) {
      res.send(error);
    }
});

getAllUserRouter.get('/me',  async (req, res, next) => {
    try { 
    res.send(req.user);
    } catch (error) {
     next(error);
    }
});
getAllCommentsRouter.get('/', async (req,res,next)=>{
    try {
        const allComments = await getAllComments()
        res.send(allComments)
    } catch (error) {
        res.send(error)
    }
});
getCommentRouter.get('/:commentId', async (req,res,next)=>{
    try {
        const {commentId}  = req.params
        const currentComment = await getSingleComment(commentId)
        
        res.send(currentComment)
    } catch (error) {
        res.send(error)
    }
});

createCommentRouter.post('/', async (req,res,next)=>{
    try {
        const currentId = Math.random().toString(36).substr(2, 9);
            const newComment = await createComment({id: currentId})
            res.send(newComment)

    } catch (error) {
        
    }
})



module.exports ={
    getAllUserRouter,
    getAllCommentsRouter,
    getCommentRouter
    

}