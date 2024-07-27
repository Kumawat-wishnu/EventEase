const mysql= require('mysql2');

const connection= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE

})
console.log(process.env['DATABASE_HOST']);
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });



//  creating properties table
 const createTempTable=`
 CREATE TABLE IF NOT EXISTS temp (
   property_id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   price DECIMAL(10, 2) NOT NULL,
   owner_id INT,
   rent DECIMAL(10, 2) NOT NULL,
   monopoly_group VARCHAR(50),
   houses_built INT DEFAULT 0,
   hotels_built INT DEFAULT 0
 )
 `;
 // FOREIGN KEY (owner_id) REFERENCES Players(player_id)

 connection.query(createTempTable, (error,results)=>{
   if(error){
       console.error('Error creating temp table;',error);
   }
   else{
       console.log('temp Table created or already exists');
   }
 });

 const createTableQuery = `
 CREATE TABLE IF NOT EXISTS users (
   user_id INT AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password_hash VARCHAR(255) NOT NULL,
   role ENUM('user', 'manager') NOT NULL DEFAULT 'user',
   resetPasswordToken VARCHAR(255) DEFAULT NULL,
   resetPasswordExpire DATETIME DEFAULT NULL
 );
`;

 connection.query(createTableQuery, (error,results)=>{
   if(error){
       console.error('Error creating users table;',error);
   }
   else{
       console.log('users Table created or already exists');
   }
});

const createEventTableQuery= `
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

connection.query(createEventTableQuery,(error,results)=>{
  if(error){
    console.error('Error creating Event table;',error);
  }
  else{
    console.log('event Table created or already exists');
  }});

   // Drop the existing user_events table if it exists
  //  const dropUserEventsTableQuery = 'DROP TABLE IF EXISTS user_events;';
  
  //  connection.query(dropUserEventsTableQuery, (error, results) => {
  //    if (error) {
  //      console.error('Error dropping user_events table:', error);
  //    } else {
  //      console.log('user_events table dropped (if it existed)');
  //    }});

  const createUserEventsTableQuery=`
  CREATE TABLE IF NOT EXISTS user_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    ticket_code VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
  `;

  connection.query(createUserEventsTableQuery,(error,results)=>{
    if(error)
    {
      console.error('Error creating user_events table;',error);
    }
    else{
      console.log('user_events Table created or already exists');
    }
  });

  // const AlterTicketsTableQuery=`
  // ALTER TABLE events ADD COLUMN image_url VARCHAR(255);
  // `;

  // connection.query(AlterTicketsTableQuery,(error,results)=>{
  //   if(error)
  //   {
  //     console.error('Error altering table;',error);
  //   }
  //   else{
  //     console.log('table altered successfully');
  //   }
  // });
  
 module.exports=connection;