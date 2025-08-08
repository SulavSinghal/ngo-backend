const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const slidesRouter = require('./routes/slides');
const activity = require('./routes/Activity');
const volunteerStoriesRoutes = require('./routes/VolunteerStory');
const volunteerApplication = require('./routes/VolunteerApplication');
const VolunteerOppurtunities = require('./routes/VolunteerOppurtunities');
const teamMembersRoutes = require('./routes/TeamMember');
const InchargeMember = require("./routes/InchargeMember");

const path = require('path');
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']; // For client and admin-client
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));


// Middleware to parse JSON bodies
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(express.json());
app.use('/api/testimonials', require('./routes/testimonial'));
app.use('/api/about-us', require('./routes/AboutUs'));
app.use('/api/slides', slidesRouter);
app.use('/api/activities',activity);
app.use('/api/volunteer-stories', volunteerStoriesRoutes);
app.use('/api/volunteer-applications',volunteerApplication);
app.use('/api/volunteer-opportunities',VolunteerOppurtunities);
app.use('/api/teamMembers',teamMembersRoutes);
app.use('/api/InchargeMember',InchargeMember);

// A simple test route

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));