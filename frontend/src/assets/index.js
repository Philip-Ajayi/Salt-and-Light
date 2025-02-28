const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const moment = require('moment-timezone');

// Load the timezone data
moment.tz.load(require('moment-timezone/data/packed/latest.json'));

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection string (using your connection string)
const mongoURI = 'mongodb+srv://barryjacob08:HrpYPLgajMiRJBgN@cluster0.ssafp.mongodb.net/yourDBName?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  location: String,
  session: String
});

// Updated Attendance schema with reference to User
const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  session: String,
  time: String,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Time window function to determine if the current time is within any defined window
const checkAttendanceWindow = (time) => {
  const windows = [
    { start: '00:00', end: '15:00' },
    { start: '15:01', end: '18:00' },
    { start: '19:00', end: '20:00' },
    { start: '21:00', end: '22:00' },
  ];

  const nowInGMT1 = moment.tz(time, "Africa/Lagos"); // Change to "Africa/Lagos"
  const current = nowInGMT1.hours() * 60 + nowInGMT1.minutes();

  return windows.find(window => {
    const [startHour, startMin] = window.start.split(':').map(Number);
    const [endHour, endMin] = window.end.split(':').map(Number);
    return current >= startHour * 60 + startMin && current <= endHour * 60 + endMin;
  });
};

// Endpoint to handle login
app.post('/api/login/:role', async (req, res) => {
  const { email } = req.body;
  const now = new Date();
  const attendanceWindow = checkAttendanceWindow(now);

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (attendanceWindow) {
        await Attendance.findOneAndUpdate(
          { user: user._id, time: { $gte: attendanceWindow.start, $lte: attendanceWindow.end } },
          { session: req.params.role, time: moment().tz("Africa/Lagos").format('HH:mm'), date: moment().tz("Africa/Lagos").format('YYYY-MM-DD') },
          { upsert: true }
        );
        return res.json({ success: true, session: req.params.role, time: moment().tz("Africa/Lagos").format('HH:mm'), date: moment().tz("Africa/Lagos").format('YYYY-MM-DD'), name: user.name });
      } else {
        return res.json({ success: true, message: "User found, but outside attendance window.", name: user.name });
      }
    } else {
      return res.json({ success: false, message: "Email not found." });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Server error during login. Check logs for details.' });
  }
});

// Endpoint to handle registration and attendance marking
app.post('/api/register', async (req, res) => {
  const { name, phone, email, location } = req.body;
  const now = new Date();
  const attendanceWindow = checkAttendanceWindow(now);

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, phone, email, location, session: 'new' });
      await user.save();
    }

    if (attendanceWindow) {
      const newAttendance = new Attendance({
        user: user._id,
        session: 'new',
        time: moment().tz("Africa/Lagos").format('HH:mm'),
        date: moment().tz("Africa/Lagos").format('YYYY-MM-DD')
      });
      await newAttendance.save();
      return res.json({ success: true, session: 'new', time: moment().tz("Africa/Lagos").format('HH:mm'), date: moment().tz("Africa/Lagos").format('YYYY-MM-DD'), name: user.name });
    } else {
      return res.json({ success: true, message: "User registered but not within the attendance window." });
    }
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ success: false, message: 'Server error during registration. Check logs for details.' });
  }
});

// Endpoint to handle registration only (if needed)
app.post('/api/registerr', async (req, res) => {
  const { name, phone, email, location } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    const newUser = new User({ name, phone, email, location });
    await newUser.save();

    return res.json({ success: true });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ success: false, message: 'Server error during registration. Check logs for details.' });
  }
});

// Endpoint to fetch attendance for a specific session and date (with user details)
app.get('/api/attendance', async (req, res) => {
  const { session, date } = req.query;
  try {
    const attendees = await Attendance.find({ session, date })
      .populate('user', 'name email phone location') // Populate user details (select specific fields)
      .exec();

    res.json(attendees.map(attendance => ({
      name: attendance.user.name,
      email: attendance.user.email,
      phone: attendance.user.phone,
      location: attendance.user.location,
      session: attendance.session,
      time: attendance.time,
      date: attendance.date
    })));
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ message: 'Error fetching attendance.' });
  }
});

// Endpoint to fetch all attendees (with user details)
app.get('/api/attendees', async (req, res) => {
  try {
    const attendees = await Attendance.find({})
      .populate('user', 'name email phone location') // Populate user details
      .exec();

    res.json(attendees.map(attendance => ({
      name: attendance.user.name,
      email: attendance.user.email,
      phone: attendance.user.phone,
      location: attendance.user.location,
      session: attendance.session,
      time: attendance.time,
      date: attendance.date
    })));
  } catch (err) {
    console.error('Error fetching all attendees:', err);
    res.status(500).json({ message: 'Error fetching attendees.' });
  }
});

// Endpoint to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users.' });
  }
});

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Fallback route to serve index.html for all unknown routes (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
