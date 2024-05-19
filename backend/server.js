require('dotenv').config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const db = require("./models/index"); // Import the db object

const PORT = process.env.PORT || 8000;
const app = express();

const corsOptions = {
  // origin: 'http://localhost:3000', // Allow requests from this origin
  origin: 'https://664a25498c65b1d1ba4cda78--fluffy-sorbet-25d20f.netlify.app/', // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE', // Allow only these HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow only these headers 
  credentials: true, // Allow credentials
};

// Middleware to parse JSON data
app.use(express.json());
// so that our app can understand and interact with cookies
app.use(cookieParser());
// to handle cors error
app.use(cors(corsOptions));

// Sync database
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Unable to synchronize database:', error);
  });

// Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // if the data doesn't exist
    if (!(name && password && email)) {
      return res.status(400).send("All fields are compulsory!");
    }
    // check if user exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send("User with this email already exists!");
    } else {
      // encrypt the password
      const encPassword = await bcrypt.hash(password, 10);
      const user = await db.User.create({ name, email, password: encPassword });

      // generate a token for user
      const token = jwt.sign({ id: user.pid, email }, process.env.JWT_SECRET || "shhhh", {
        expiresIn: "2d",
      });

      user.token = token;
      user.password = undefined;
    
      // send the data as json
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("Incomplete data!");
    } else {
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send("User does not exist");
      }
      const pass = await bcrypt.compare(password, user.password);
      if (user && pass) {
        const token = jwt.sign({ id: user.pid }, process.env.JWT_SECRET || "shhhh");
        user.token = token;
        user.password = undefined;

        // send token in user cookie
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // data.now + 3days converted to milliseconds
          httpOnly: true, // can only be accessed by the server
        };
        // the name of cookie is token
        return res.status(200).cookie("token", token, options).json({
          success: true,
          token,
          user,
        });
      } else {
        return res.status(401).send("Invalid credentials");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.put("/api/auth/profile", async (req, res) => {
  try {
    console.log('request starts from here watch out:', req);
    const authHeader = req.headers['authorization'];
    const { email, name } = req.body;

    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shhhh');
    const [updatedRowsCount] = await db.User.update(
      { email, name },
      {
        where: {
          pid: decoded.id,
        },
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'User not found or not authorized' });
    }

    // Fetch the updated user from the database
    let updatedUser = await db.User.findOne({ where: { pid: decoded.id } });
    updatedUser = { ...updatedUser.toJSON(), token }; // converting sequelize model instance to a plain js object
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/auth/profile", async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shhhh');
    await db.User.destroy({
      where: {
        pid: decoded.id,
      },
    });
    return res.status(200).send('Account deletion successful!');
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
