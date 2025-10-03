
const app = require('./app');
const mongoose = require('mongoose');   
const config = require('./config/config');




const startServer =()=>{
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
}); 
} 


mongoose.connect(config.mongoose.url).then(() => {
    console.log('Connected to MongoDB');
    startServer();
}).catch((err) => {
    console.error('Error connecting to MongoDB', err.message);
    process.exit(1);
}); 

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
