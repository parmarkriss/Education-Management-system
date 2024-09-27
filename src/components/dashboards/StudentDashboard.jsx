import React, { useContext, useState } from 'react';
import { AdminContext } from '../AdminContext';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { courses, assignments, grades, quizzes } = useContext(AdminContext);
  const { currentUser, logoutUser } = useContext(UserContext);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Redirect to login if not logged in
  if (!currentUser) {
    navigate('/');
  }

  // Filter courses assigned by the current teacher
  const assignedCourses = courses.filter(course => course.teacherEmail === currentUser.email);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    if (selectedAssignment && file) {
      const formData = new FormData();
      formData.append('file', file);

      alert(`Submitted ${file.name} for assignment: ${selectedAssignment}`);
      setFile(null);
      setSelectedAssignment(null);
    } else {
      alert('Please select an assignment and a file to submit.');
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/'); 
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Welcome Student, {currentUser.email}!</h1>
      
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 mb-6 w-full md:w-auto"
      >
        Logout
      </button>

      {/* Courses Section */}
      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Your Courses</h2>
        <ul className="bg-gray-100 rounded-md p-4 space-y-4 md:space-y-2">
          {assignedCourses.length > 0 ? (
            assignedCourses.map(course => (
              <li key={course.id} className="py-2 border-b last:border-b-0 text-sm md:text-base">
                {course.name} <span className="text-gray-600">(Assigned by: {course.teacherName})</span>
              </li>
            ))
          ) : (
            <li>No courses assigned by this teacher.</li>
          )}
        </ul>
      </section>

      {/* Grades Section */}
      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Your Grades</h2>
        <ul className="bg-gray-100 rounded-md p-4 space-y-4 md:space-y-2">
          {grades.map((grade, index) => (
            <li key={index} className="py-2 border-b last:border-b-0 text-sm md:text-base">
              {`${grade.courseId}: ${grade.grade}`}
            </li>
          ))}
        </ul>
      </section>

      {/* Assignments Section */}
      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Assignments</h2>
        <form onSubmit={handleSubmitAssignment} className="bg-gray-100 rounded-md p-4 space-y-4">
          <label className="block">
            <span className="text-gray-700 text-sm md:text-base">Select an Assignment</span>
            <select 
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md text-sm md:text-base" 
              onChange={(e) => setSelectedAssignment(e.target.value)}
            >
              <option value="">Select an assignment</option>
              {assignments.map(assignment => (
                <option key={assignment.id} value={assignment.id}>{assignment.title}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700 text-sm md:text-base">Upload Assignment File</span>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="block w-full mt-1 border border-gray-300 rounded-md p-2 text-sm md:text-base" 
            />
          </label>
          
          <button 
            type="submit" 
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 w-full md:w-auto"
          >
            Submit Assignment
          </button>
        </form>
      </section>

      {/* Quizzes Section */}
      <section className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Your Quizzes</h2>
        <ul className="bg-gray-100 rounded-md p-4 space-y-4 md:space-y-2">
          {quizzes.map(quiz => (
            <li key={quiz.id} className="py-2 border-b last:border-b-0 text-sm md:text-base">
              {`${quiz.title} - Due: ${quiz.dueDate}`}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default StudentDashboard;
