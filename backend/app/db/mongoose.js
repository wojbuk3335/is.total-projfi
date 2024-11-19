const mongoose = require("mongoose");

async function sendNotification(message) {
  console.log("Notification:", message);
}

async function connectToDatabase() {
  try {
    // Adjusted connection string for MongoDB 4.0.3
    // Note: Replace <password> with the actual password, ensuring special characters are URL encoded if necessary
    await mongoose.connect('mongodb://total-projfi_Seminarium:9LNSWh9bSh@mongodb.total-projfi.nazwa.pl:4010/total-projfi_Seminarium', {});
    // await mongoose.connect('mongodb://total-projfi_Seminarium:9LNSWh9bSh@mongodb.total-projfi.nazwa.pl:4010/total-projfi_Seminarium');
    // await mongoose.connect("mongodb://localhost:27017/IS", {});
    console.log("Successfully connected to MongoDB.");
    await sendNotification("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    await sendNotification(`Failed to connect to MongoDB: ${err}`);
  }
}

connectToDatabase();
