import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', isAdmin: false });

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('https://s-mart-backend.onrender.com/api/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      toast.error('Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleAdmin = async (userId, isAdmin) => {
    try {
      await axios.put(
        `https://s-mart-backend.onrender.com/api/admin/users/${userId}`,
        { isAdmin: !isAdmin },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('User role updated successfully!');
      fetchUsers(); // Re-fetch users to update the list
    } catch (error) {
      toast.error('Failed to update user role.');
    }
  };

  const deleteUserHandler = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://s-mart-backend.onrender.com/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        toast.success('User deleted successfully!');
        fetchUsers(); // Re-fetch users to update the list
      } catch (error) {
        toast.error('Failed to delete user.');
      }
    }
  };

  const openEditModal = (user) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setShowEditModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUserHandler = async () => {
    try {
      await axios.put(`https://s-mart-backend.onrender.com/api/admin/users/${editingUser._id}`, editingUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('User updated successfully!');
      closeEditModal();
      fetchUsers(); // Re-fetch users to update the list
    } catch (error) {
      toast.error('Failed to update user.');
    }
  };

  const openAddModal = () => {
    setNewUser({ name: '', email: '', password: '', isAdmin: false });
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addUserHandler = async () => {
    try {
      await axios.post('https://s-mart-backend.onrender.com/api/admin/users', newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('User added successfully!');
      closeAddModal();
      fetchUsers(); // Re-fetch users to update the list
    } catch (error) {
      toast.error('Failed to add user.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;

  // Prepare data for charts
  const adminCount = users.filter(user => user.isAdmin).length;
  const regularUserCount = users.length - adminCount;

  const userData = {
    labels: ['Admins', 'Regular Users'],
    datasets: [
      {
        label: 'Number of Users',
        data: [adminCount, regularUserCount],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Role Distribution',
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Role Count',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <button
        onClick={openAddModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add New User
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Role Distribution (Pie Chart)</h2>
          <Pie data={userData} options={pieOptions} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Role Count (Bar Chart)</h2>
          <Bar data={userData} options={barOptions} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Admin</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{user._id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    {user.isAdmin ? 'Yes' : 'No'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                      className={`py-1 px-3 rounded text-white ${
                        user.isAdmin ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                      } mr-2`}
                    >
                      {user.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                    </button>
                    <button
                      onClick={() => openEditModal(user)}
                      className="py-1 px-3 rounded text-white bg-blue-500 hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUserHandler(user._id)}
                      className="py-1 px-3 rounded text-white bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={editingUser.name}
                onChange={handleEditChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={editingUser.email}
                onChange={handleEditChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={updateUserHandler}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={closeEditModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
