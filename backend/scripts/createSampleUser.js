import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/userModel.js";

async function main() {
  const sampleUser = {
    name: "Devashish Gupta",
    email: "devashish.gupta@iiest.ac.in",
    roll: "2021itb055",
    password: "Devashish@123",
    iiestian: true,
    role: "member",
  };

  try {
    await connectDB();

    const existingUser = await User.findOne({ roll: sampleUser.roll });
    if (existingUser) {
      console.log(`User with roll ${sampleUser.roll} already exists. Updating credentials...`);
      existingUser.name = sampleUser.name;
      existingUser.email = sampleUser.email;
      existingUser.passwordHash = await bcrypt.hash(sampleUser.password, 12);
      existingUser.iiestian = true;
      existingUser.role = sampleUser.role;
      await existingUser.save();
      console.log("Existing user updated successfully.");
    } else {
      const passwordHash = await bcrypt.hash(sampleUser.password, 12);
      await User.create({
        name: sampleUser.name,
        email: sampleUser.email,
        roll: sampleUser.roll,
        passwordHash,
        iiestian: true,
        role: sampleUser.role,
      });
      console.log("Sample user created successfully.");
    }
  } catch (error) {
    console.error("Failed to create sample user:", error);
  } finally {
    await mongoose.disconnect();
  }
}

main();
