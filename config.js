const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://singhalkhushi2545:FeOWrUqIwHwxOeNd@cluster0.82ztdp3.mongodb.net/?retryWrites=true&w=majority",
            {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
                // useFindAndModify: false
                useNewUrlParser: true,
                // useCreateIndex: true,
                useUnifiedTopology: true,
                // useFindAndModify: false,


            })
        //  mongoose.set("useCreateIndex",true);
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;