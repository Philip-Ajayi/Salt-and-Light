import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SessionList = () => {
  const [session, setSession] = useState('');
  const [date, setDate] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('/api/attendance', {
        params: { session, date },
      });
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAttendance = attendance.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export the filtered data to CSV
  const exportToCSV = () => {
    const csvRows = [];
    const headers = ['Name', 'Email', 'Phone', 'Location']; // Add headers
    csvRows.push(headers.join(','));

    filteredAttendance.forEach(user => {
      const row = [user.name, user.email, user.phone, user.location];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `attendance_${session}_${date}.csv`;
    link.click();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-purple-600 text-2xl mb-4 text-center">Session Attendance</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Session/Role Name"
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2"
        />
      </div>

      <div className="flex justify-center">
        <button onClick={fetchAttendance} className="bg-purple-600 text-white px-4 py-2 rounded">
          Fetch Attendance
        </button>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className="border p-2 w-full sm:w-1/2 mx-auto block"
        />
      </div>

      <div className="text-center mt-4">Total Count: {filteredAttendance.length}</div>

      {/* Button for exporting to CSV */}
      <div className="flex justify-center mt-4">
        <button onClick={exportToCSV} className="bg-blue-600 text-white px-4 py-2 rounded">
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map(user => (
              <tr key={user.email} className="border-t">
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.phone}</td>
                <td className="px-4 py-2 border">{user.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionList;
