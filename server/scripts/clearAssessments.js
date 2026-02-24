import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("Connecting to", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    try {
        const Assessment = mongoose.connection.db.collection("skillassessments");
        const result = await Assessment.deleteMany({});
        console.log("Deleted old assessments:", result.deletedCount);
    } catch (error) {
        console.error("Error clearing assessments:", error);
    } finally {
        process.exit(0);
    }
});
