import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../AdminContext'; // Import your context
import { UserContext } from '../UserContext'; // Import UserContext
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { courses, addCourse, editCourse, deleteCourse } = useContext(AdminContext);
  const { currentUser, logoutUser } = useContext(UserContext); // Access current user and logoutUser
  const navigate = useNavigate(); // For navigation
  const [newCourse, setNewCourse] = useState({ title: '', description: '', startDate: '', endDate: '', teacher: '' });
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Redirect to login if no user is authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/'); // Redirect to login page
    }
  }, [currentUser, navigate]);

  const handleAddCourse = () => {
    const courseWithId = { ...newCourse, id: Date.now() }; // Adding unique ID
    addCourse(courseWithId);
    setNewCourse({ title: '', description: '', startDate: '', endDate: '', teacher: '' }); // Reset form
  };

  const handleLogout = () => {
    logoutUser(); // Call logoutUser from UserContext
    navigate('/'); // Redirect after logout
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-lg lg:static fixed lg:h-auto h-screen z-10">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="px-4 py-2 hover:bg-blue-100">
              <Link to={'/users'}><a className="text-gray-600">Users</a></Link>
            </li>
            <li className="px-4 py-2 hover:bg-blue-100">
              <a href="#" className="text-gray-600">Tasks</a>
            </li>
            <li className="px-4 py-2 hover:bg-blue-100">
              <a href="#" className="text-gray-600">Courses</a>
            </li>
            <li className="px-4 py-2 hover:bg-blue-100">
              <a href="#" className="text-gray-600">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 lg:p-10 overflow-y-auto bg-gray-100">
        <header className="flex justify-between items-center mb-5">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Dashboard</h1>
          <button onClick={handleLogout} className="px-3 lg:px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">Logout</button>
        </header>

        {/* Add Course Form */}
        <section className="mb-10">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">Add New Course</h2>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-2">
            <input
              type="text"
              placeholder="Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              className="w-full lg:w-auto px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              className="w-full lg:w-auto px-4 py-2 border rounded"
            />
            <input
              type="date"
              value={newCourse.startDate}
              onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
              className="w-full lg:w-auto px-4 py-2 border rounded"
            />
            <input
              type="date"
              value={newCourse.endDate}
              onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })}
              className="w-full lg:w-auto px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Assigned Teacher"
              value={newCourse.teacher}
              onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
              className="w-full lg:w-auto px-4 py-2 border rounded"
            />
            <button onClick={handleAddCourse} className="w-full lg:w-auto px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition">Add Course</button>
          </div>
        </section>

        {/* Search Input */}
        <section className="mb-10">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">Search Courses</h2>
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-1/3 px-4 py-2 border rounded"
          />
        </section>

        {/* Courses Overview */}
        <section className="mt-10">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">Courses Overview</h2>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-6">
            <table className="min-w-full">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Title</th>
                  <th className="px-4 py-2 text-left text-gray-600">Description</th>
                  <th className="px-4 py-2 text-left text-gray-600">Start Date</th>
                  <th className="px-4 py-2 text-left text-gray-600">End Date</th>
                  <th className="px-4 py-2 text-left text-gray-600">Assigned Teacher</th>
                  <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map(course => (
                  <tr className="hover:bg-gray-100" key={course.id}>
                    <td className="px-4 py-2">{course.title}</td>
                    <td className="px-4 py-2">{course.description}</td>
                    <td className="px-4 py-2">{course.startDate}</td>
                    <td className="px-4 py-2">{course.endDate}</td>
                    <td className="px-4 py-2">{course.teacher}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => editCourse(course.id, { ...course, title: 'Edited Title' })} className="text-blue-600 hover:text-blue-800 transition">Edit</button>
                      <button onClick={() => deleteCourse(course.id)} className="ml-2 text-red-600 hover:text-red-800 transition">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
