import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Influence() {
  const role = 'Influence-Night'; // Define the role for the login and registration
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    phone: '',
    email: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/login/${role}`, { email });
      if (response.data.success) {
        const currentDate = new Date().toLocaleDateString();
        navigate('/success', { state: { session: response.data.session, time: response.data.time, date: response.data.date || currentDate, name: response.data.name } });
      } else {
        setError(response.data.message);
        setShowRegistration(true);
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/register/${role}`, registrationData); // Include role in the registration API call
      if (response.data.success) {
        const currentDate = new Date().toLocaleDateString();
        navigate('/success', { state: { session: role, time: response.data.time, date: response.data.date || currentDate, name: response.data.name } });
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#4f0981] via-[#c63cd8] to-[#9733d7] p-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login for {role}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!showRegistration ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
              Submit
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegistrationSubmit}>
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
              placeholder="Name"
              value={registrationData.name}
              onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
              required
            />
            <input
              type="tel"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
              placeholder="Phone"
              value={registrationData.phone}
              onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
              required
            />
            <input
              type="email"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
              placeholder="Email"
              value={registrationData.email}
              onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
              required
            />
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
              placeholder="Location"
              value={registrationData.location}
              onChange={(e) => setRegistrationData({ ...registrationData, location: e.target.value })}
              required
            />
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
