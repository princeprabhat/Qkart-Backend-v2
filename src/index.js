require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');   


const port = process.env.PORT || 3000;



const startServer =()=>{
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
} 


mongoose.connect(process.env.MONGODB_URL).then(() => {
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
