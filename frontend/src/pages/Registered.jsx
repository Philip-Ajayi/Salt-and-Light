import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Registered = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export the filtered data to CSV
  const exportToCSV = () => {
    const csvRows = [];
    const headers = ['Name', 'Email', 'Phone', 'Location']; // Add headers
    csvRows.push(headers.join(','));

    filteredUsers.forEach(user => {
      const row = [user.name, user.email, user.phone, user.location];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'registered_users_list.csv';
    link.click();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-purple-600 text-2xl mb-4 text-center">Registered Users</h2>
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearch}
        className="border p-2 mb-4 w-full sm:w-1/2 mx-auto block"
      />
      <div className="text-center mb-4">Total Count: {filteredUsers.length}</div>

      {/* Button for exporting to CSV */}
      <div className="flex justify-center mb-4">
        <button onClick={exportToCSV} className="bg-blue-600 text-white px-4 py-2 rounded">
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left border-collapse w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
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

export default Registered;
