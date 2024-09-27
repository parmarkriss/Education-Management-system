import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom'; // Adjust the path as necessary

const Users = () => {
  const { users } = useContext(UserContext); // Access users from UserContext
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Filter users by role
  const teachers = users.filter(user => user.role === 'teacher');
  const students = users.filter(user => user.role === 'student');

  // Filtered teachers and students based on search term
  const filteredTeachers = teachers.filter(teacher =>
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-lg">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
        </div>
        <nav className="mt-5 lg:mt-10">
          <ul>
            <li className="px-4 py-2 hover:bg-blue-100">
              <Link to={'/admin'}>
                <span className="text-gray-600">Dashboard</span>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-blue-100">
              <a href="#" className="text-gray-600">Tasks</a>
            </li>
            <li className="px-4 py-2 hover:bg-blue-100">
              <a href="#" className="text-gray-600">Courses</a> {/* New Section */}
            </li>
            <li className="px-4 py-2 hover:bg-blue-100">
              <a href="#" className="text-gray-600">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10 overflow-y-auto bg-gray-100">
        <header className="flex flex-col lg:flex-row justify-between items-center mb-5">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 lg:mb-0">Dashboard</h1>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
            Logout
          </button>
        </header>

        <div className="p-4 lg:p-5 bg-gray-100 rounded-lg">
          <h1 className="text-xl lg:text-2xl font-bold mb-5">Users Overview</h1>

          {/* Search Input */}
          <div className="mb-5">
            <input
              type="text"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>

          {/* Teachers List */}
          <section className="mb-10">
            <h2 className="text-lg lg:text-xl font-semibold mb-2">Teachers</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-6">
              <table className="min-w-full text-sm lg:text-base">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">Email</th>
                    <th className="px-4 py-2 text-left text-gray-600">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{teacher.email}</td>
                      <td className="px-4 py-2">{teacher.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Students List */}
          <section>
            <h2 className="text-lg lg:text-xl font-semibold mb-2">Students</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <table className="min-w-full text-sm lg:text-base">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">Email</th>
                    <th className="px-4 py-2 text-left text-gray-600">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2">{student.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Users;
