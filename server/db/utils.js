const { client } = require('./index');
async function createUser({ 
    id,
    firstName,
    lastName,
    username, 

    }) {
      try {
      
        const { rows: [ user ] } = await client.query(`
          INSERT INTO users(id,"firstName", "lastName",  username) 
          VALUES($1, $2, $3, $4 ) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `, [id,firstName, lastName, username]);
      
        return user;
      } catch (error) {
        throw error;
      }
    };

    async function createComment({id, username, parentId, userId, createdAt, body }) {
        //const date = new Date();
        try{
       const {rows:[comment]} = await client.query(`
        INSERT INTO comments(id, "username", "parentId" , "userId", createdAt, "body")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [id, username, parentId, userId, createdAt, body])
       return comment;

    } catch(error){
     throw error
    }
    };

    async function getAllUsers() {
        try {
          const {rows: allUsers} = await client.query(`
        SELECT * FROM users;
        `);
        if (!allUsers) {
          return null; 
        }
    
        return allUsers;
        } catch (error) {
          throw error;
        }
      }

      async function getAllComments() {
        try {
          const {rows: allComments} = await client.query(`
        SELECT * FROM comments;
        `);
        if (!allComments) {
          return null; 
        }
    
        return allComments;
        } catch (error) {
          throw error;
        }
      }
      async function deleteComment(id) {
        try {
          const { rows: [comment] } = await client.query(`
          DELETE FROM comments
          WHERE id=$1
          RETURNING *
          `, [id]);
          return comment;
        } catch (error) {
            throw error;
        }
    };
    async function getSingleComment(id) {
        try {
          const { rows: [comment] } = await client.query(`
           SELECT * FROM comments
            WHERE id=$1
          `, [id]);
          return comment;
        } catch (error) {
            throw error;
        }
    };


    module.exports ={
        createComment,
        createUser,
        deleteComment,
        getAllComments,
        getAllUsers,
        getSingleComment
    }