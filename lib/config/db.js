import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://john1234:${process.env.NEXT_PUBLIC_PW}@cluster0.3fssr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );
  console.log("DB connected");
};
