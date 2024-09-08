import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, registerUser, updateUser, deleteUser } from '@/services/user.service';

export default function ManagementPanel() {
  const dispatch: any = useDispatch();
  const { users, loading, error } = useSelector((state: any) => state.users);
  const [newUser, setNewUser] = useState<any>({
    fullName: '',
    email: '',
    password: '',
    role: 0,
    status: 1,
  });
  const [formError, setFormError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const usersPerPage = 10;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Handle status change for existing users
  const handleStatusChange = async (user: any) => {
    if (user.role === 1) {
      alert('Không thể khóa tài khoản Admin');
      return;
    }

    const newStatus = user.status === 1 ? 0 : 1;

    try {
      await dispatch(updateUser({ ...user, status: newStatus }));
    } catch (error) {
      console.error('Cập nhật trạng thái không thành công:', error);
    }
  };

  // Handle form submission to add or update a user
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (!newUser.fullName || !newUser.email || (!editMode && !newUser.password)) {
      setFormError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      if (editMode && currentUser) {
        await dispatch(updateUser({
          id: currentUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
          profilePicture: "",
          password: newUser.password ? newUser.password : currentUser.password // Maintain existing password if not provided
        }));
      } else {
        await dispatch(registerUser(newUser));
      }
      setNewUser({ fullName: '', email: '', password: '', role: 0, status: 1 });
      setShowForm(false);
      setEditMode(false);
      setCurrentUser(null);
      setSearchQuery(''); // Clear search query
      dispatch(getUsers()); // Refresh the user list
    } catch (error) {
      console.error('Thao tác không thành công:', error);
    }
  };

  // Handle user deletion
  const handleDelete = async (userId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await dispatch(deleteUser(userId));
        dispatch(getUsers()); // Refresh the user list
      } catch (error) {
        console.error('Xóa người dùng không thành công:', error);
      }
    }
  };

  // Handle edit button click
  const handleEdit = (user: any) => {
    setCurrentUser(user);
    setNewUser({
      fullName: user.fullName,
      email: user.email,
      password: '', // Password field is not editable
      role: user.role,
      status: user.status,
    });
    setEditMode(true);
    setShowForm(true);
  };

  // Filter users based on search query
  const filteredUsers = users?.filter((user: any) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Calculate displayed users
  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const displayedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page handler
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User Management Panel</h2>

      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Button to show the form */}
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditMode(false);
          setCurrentUser(null);
          setNewUser({ fullName: '', email: '', password: '', profilePicture: '',role: 0, status: 1 });
        }}
        className="mb-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        {showForm ? 'Hide Form' : 'Add New User'}
      </button>

      {/* Form to add or update a user */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto fixed top-16 left-1/2 transform -translate-x-1/2 z-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            {editMode ? 'Edit User' : 'Add New User'}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.fullName}
              onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border p-2 rounded"
            />
            {!editMode && (
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="border p-2 rounded"
              />
            )}
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: parseInt(e.target.value) })}
              className="border p-2 rounded"
            >
              <option value={0}>User</option>
              <option value={1}>Admin</option>
            </select>
          </div>
          {formError && <p className="text-red-500 mt-2">{formError}</p>}
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {editMode ? 'Update User' : 'Add User'}
          </button>
        </form>
      )}

      {/* User table */}
      {Array.isArray(displayedUsers) && displayedUsers.length > 0 ? (
        <div>
          <table className="table-auto w-full border-collapse border border-gray-400 bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">STT</th>
                <th className="border border-gray-400 px-4 py-2">User Name</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
                <th className="border border-gray-400 px-4 py-2">Role</th>
                <th className="border border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user: any, index: number) => (
                <tr key={user.id}>
                  <td className="border border-gray-400 px-4 py-2">{index + 1 + currentPage * usersPerPage}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.fullName}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                  <td
                    className="border border-gray-400 px-4 py-2 cursor-pointer text-blue-500 hover:underline"
                    onClick={() => handleStatusChange(user)}
                  >
                    {user.status === 1 ? 'Active' : 'Inactive'}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {user.role === 1 ? 'Admin' : 'User'}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-4 py-2 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No users found</p>
      )}
    </div>
  );
}
