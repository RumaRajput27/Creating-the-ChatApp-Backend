const express = require("express");
const cors = require("cors");
const sequelize = require("./db/db-config");
const userRoutes = require("./routes/userRoutes");
const usersChatRoutes = require("./routes/usersChatRoutes");


const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
 

// Middleware
app.use(express.json()); // For parsing JSON data

// Routes
app.use("/api/users", userRoutes);
app.use("/api/users-chats", usersChatRoutes);

// Start the server
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Verify the database connection
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true }); // Sync models with the database
    console.log("Database models synchronized.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error.message);
  }
};

startServer();
