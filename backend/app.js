const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const app = express();
const PORT = 3000;
// enable cors
app.use(cors());
// enable json parser
app.use(express.json());
// إعداد مفاتيح الوصول AWS.config.update({ accessKeyId: 'YOUR_ACCESS_KEY_ID', secretAccessKey: 'YOUR_SECRET_ACCESS_KEY', region: 'us-west-2' // أو أي منطقة مناسبة });
const s3 = new AWS.S3();
const params = { Bucket: 'your-bucket-name', Key: 'file-name.txt', Body: 'Hello, world!' };
s3.upload(params, function(err, data) { if (err) { console.error('Error:', err); } else { console.log('File uploaded successfully:', data.Location); } });
// route the customer api
const customerRoutes = require('./routes/customers');
// use the route
app.use('/api/customers', customerRoutes);
app.get('/', (req, res) => {
    res.send("Welcome to Customers API !");
});
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is successfully listening at port:", PORT);
    else
        console.error('An error occurred:', error);
});
main().catch((error) => console.error(error));
async function main() {
    // use the correct connection string
    const connectionString = "mongodb+srv://Adel:1234512345@cluster0.aqg6w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // أو سلسلة اتصال MongoDB Atlas الصحيحة
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('strictQuery', true);
}
