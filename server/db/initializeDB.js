const { client } = require('./index');
const { createUser, createComment } = require('./utils');


async function buildTables() {
    try {
      client.connect();
      
      console.log('Dropping All Tables...');
      await client.query(`
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS users;
      `);
      console.log('Finished dropping tables!');
  
      console.log('Starting to build tables...');
      await client.query(`
      CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        userId VARCHAR(255) NOT NULL,
        parentId VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        "createdAt" DATE 
      );
        CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          "firstName" VARCHAR(255) NOT NULL,
          "lastName" VARCHAR(255) NOT NULL,
          username VARCHAR(255) UNIQUE NOT NULL
      
        );
       
      `);
      console.log('Finished creating tables!');
    } catch (error) {
      console.error('Error while dropping tables!');
      throw error;
    }
  }

  async function populateInitialData() {
    try {
      const initialData =[
        {
          id: "1",
          body: "First comment",
          username: "Jack",
          userId: "1",
          parentId: null,
          createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
          id: "2",
          body: "Second comment",
          username: "John",
          userId: "2",
          parentId: null,
          createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
          id: "3",
          body: "First comment first child",
          username: "John",
          userId: "2",
          parentId: "1",
          createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
          id: "4",
          body: "Second comment second child",
          username: "John",
          userId: "2",
          parentId: "2",
          createdAt: "2021-08-16T23:00:33.010+02:00",
        },
      ];
      console.log('creating initial comments')
    await Promise.all(initialData.map(createComment));
    console.log('comments created')

    const initialUsers = [
      {
        id: 1,
        firstName: "Lebron",
        lastName: "james",
        username: "KingJames"
      },
      {
        id: 2,
        firstName: "Kobe",
        lastName: "Bryant",
        username: "GoatMamba"
      },
      {
        id: 3,
        firstName: "Steph",
        lastName: "Curry",
        username: "ChefCurry"
      },
    ]
    console.log('creating initial users')
    await Promise.all(initialUsers.map(createUser));
    console.log('users created')

    }catch(error){
      console.error(error)
    }finally{
      console.log('tables are seeded')
    }
  }

  buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end())