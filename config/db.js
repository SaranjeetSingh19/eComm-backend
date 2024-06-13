import mongoose from "mongoose";

// export const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log(`Mongodb is Connected 😎`);
//   } catch (error) {
//     console.log(`ERROR: ${error.message}`);
//     process.exit(1);
//   }
// };

export const connectDb = (uri) => {
  mongoose
    .connect(uri, { dbName: "Shifsy" })
    .then((data) =>
      console.log(
        `Connected to ${data.connection.name} with Host: ${data.connection.host}`
      )
    )
    .catch((err) => {
      throw err;
    });
};
