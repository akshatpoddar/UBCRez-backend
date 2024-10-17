const mongoose = require('mongoose')
const db = "mongodb+srv://akshat31:coolMint-31@cluster1.2cispgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
    try {
      await mongoose.connect(db);
      console.log("MongoDB is Connected...");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
module.exports = connectDB;