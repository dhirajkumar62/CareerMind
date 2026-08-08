import mongoose from "mongoose";
import dns from "node:dns";

const connectDB = async () => {
  try {
    const dnsServers = process.env.DNS_SERVERS?.split(",")
      .map((server) => server.trim())
      .filter(Boolean);

    if (dnsServers?.length) {
      dns.setServers(dnsServers);
      console.log(`Using configured DNS resolvers: ${dnsServers.join(", ")}`);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
