require("dotenv").config();
const express = require("express");
const connectDataBase = require("./utils/db");
const authRoute = require("./routes/auth-router");
const progressRoute = require("./routes/progress-router");
const projectRoute = require("./routes/project-router");

const cors = require('cors');

const app = express();


app.use(cors());


const corsOptions = {
  origin: "https://localhost : 3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};


app.use(cors(corsOptions));

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.use("/api/v1/", authRoute);
app.use("/api/v1/", progressRoute);
app.use("/api/v1/", projectRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 4000;
// const PORT = process.env.PORT ;

connectDataBase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log("Shutting down...");
  await mongoose.disconnect(); // Disconnect from the database
  process.exit(0); // Exit the process
});
