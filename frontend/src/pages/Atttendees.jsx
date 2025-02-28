import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get('/api/attendees');
        setAttendees(response.data);
      } catch (error) {
        console.error('Error fetching attendees:', error);
      }
    };

    fetchAttendees();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAttendees = attendees.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export the filtered data to CSV
  const exportToCSV = () => {
    const csvRows = [];
    const headers = ['Name', 'Email', 'Phone', 'Location']; // Add headers
    csvRows.push(headers.join(','));

    filteredAttendees.forEach(user => {
      const row = [user.name, user.email, user.phone, user.location];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendees_list.csv';
    link.click();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-purple-600 text-2xl mb-4 text-center">All Attendees</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className="border p-2 w-full sm:w-1/2 mx-auto"
        />
      </div>

      <div className="text-center mb-4">Total Count: {filteredAttendees.length}</div>

      {/* Button for exporting to CSV */}
      <div className="flex justify-center mb-4">
        <button onClick={exportToCSV} className="bg-blue-600 text-white px-4 py-2 rounded">
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto">
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
            {filteredAttendees.map(user => (
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

export default Attendees;
