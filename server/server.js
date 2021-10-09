const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./src/database');
const faker = require('faker');

const User = require('./src/models/user.model');

// configure express to use cors()
// ------------------------------------------------------------------
app.use(cors());

app.get('/users', async (req, res) => {
  const users = await User.find()
    .catch( (error) => {
    console.error(error);
    res.send(error);  
  });
  res.json(users);
});

app.get('/update/:email/:amount', async (req, res) => {
  // update - deposit/withdraw amount
  // const Character = mongoose.model('Character', new mongoose.Schema({
  //   email: String,
  //   balance: Number
  // }));
  
  // await Character.create({ email: 'Jean-Luc Picard' });
  
  const filter = await { email: req.params.email };
  const update = await { balance: req.params.amount };
  console.log(req.params);

  let doc = await User.findOneAndUpdate(filter,update,{
    new: false
  });
  doc = await User.findOne(filter);

  // // Document changed in MongoDB, but not in Mongoose
  // await Character.updateOne(filter, { name: 'Will Riker' });
  // This will update `doc` age to `59`, even though the doc changed.
  // doc.age = 59;
  // await doc.save().then(() => {console.log('User balance updated');});
  res.send(JSON.stringify(doc));
  // return new Promise((resolve, reject) => {    
  //     const customers = db
  //         .collection('users')            
  //         .findOneAndUpdate(
  //             {email: req.params.email},
  //             { $inc: { balance: req.params.amount}},
  //             { returnOriginal: false },
  //             function (err, documents) {
  //                 err ? reject(err) : resolve(documents);
  //             }
  //         );            


  // });    

});
  app.get('/user-create/faker', async (req, res) => {
    const user = new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 123456789,
      balance: 0,
    });
    console.log(user);

  await user.save().then(() => console.log('User created'));

  res.send('User created \n');
});

app.get('/user-create/:name/:email/:password', async (req, res) => {
  const user = new User({
    username: req.params.name,
    email: req.params.email,
    password: req.params.password,
    balance: 0,
  });
  console.log(user);

await user.save().then(() => console.log('User created'));

res.send('User created \n');
});

// create user account
app.get('/account/create/:name/:email/:password', async (req, res) => {
  //get list of users
  const users = await User.find();
  // check if account exists
    const userTest = await users.find( (user) => user.email === req.params.email);
          // if user exists, return error message
          if( userTest === req.params.email  || userTest !== undefined){
              console.log('User already in exists');
              res.status(200).send('User already in exists');    
          }else{
              // else create user    
              const user = new User({
                username: req.params.name,
                email: req.params.email,
                password: req.params.password,
                balance: 0,
              });
              user.save().then(() =>{
                console.log('User created');
                res.status(201).send('Success');
              }).
              catch( (error) => {
                console.error(error);
                res.send(error);  
              });  
          }  
});


app.get('/users-delete', async (req, res) => {
  await User.deleteMany({}).then(() => console.log('Users deleted'));

  res.send('Users deleted \n');
});

app.get('/', (req, res) => {
  res.send('Hello from Node.js app \n');
});

//finde user

app.get('/account/find/:email', async (req, res) => {
  //get list of users
  const users = await User.find()
  .catch( (error) => {
    console.error(error); 
  });;
  // check if account exists
  const userTest =[];
  userTest.push(await users.find( (user) => user.email === req.params.email));
    console.log(userTest[0]);
    // console.log(req.params.email);
        if(userTest[0] !== undefined){
          // if user exists, return user
              res.status(200).header('data',JSON.stringify('Success')).send(JSON.stringify(userTest));
        }else{
          
          console.log('User doesn\'t exists');
          res.status(200).send('User doesn\'t exists')   
        }
});




// start server
// -----------------------
app.listen(8080, function () {
  console.log('Running on port 8080! - http://localhost:8080');
  connectDb().then(() => console.log('MongoDb connected'))
    .catch( (error) => {
    console.error(error);
  }); 
});
