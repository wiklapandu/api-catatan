require('dotenv').config(); // ! untuk menyambungkan dengan file .env
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST || 'mongodb://127.0.0.1:27017/catatan', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
