import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { AdminContext } from '../AdminContext';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate()
  const { currentUser, logoutUser } = useContext(UserContext);
  const { courses, addAssignment, addQuiz, manageGrades } = useContext(AdminContext);

  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizQuestions, setQuizQuestions] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [courseId, setCourseId] = useState('');
  const [assignmentId, setAssignmentId] = useState('');
  const [grade, setGrade] = useState('');
  const [message, setMessage] = useState('');

  const assignedCourses = courses.filter(course => course.teacher === currentUser.email);

  const handleAddAssignment = () => {
    if (!assignmentTitle || !assignmentDescription || !assignmentFile) {
      setMessage('Please fill out all fields for the assignment and upload a file.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(assignmentFile);
    reader.onloadend = () => {
      const fileData = reader.result;
      addAssignment({
        title: assignmentTitle,
        description: assignmentDescription,
        file: fileData,
      });
      setAssignmentTitle('');
      setAssignmentDescription('');
      setAssignmentFile(null);
      setMessage('Assignment added successfully!');
    };
  };

  const handleAddQuiz = () => {
    if (!quizTitle || !quizQuestions) {
      setMessage('Please fill out all fields for the quiz.');
      return;
    }
    addQuiz({ title: quizTitle, questions: quizQuestions.split(',') });
    setQuizTitle('');
    setQuizQuestions('');
    setMessage('Quiz added successfully!');
  };

  const handleGradeSubmit = () => {
    if (!studentEmail || !courseId || !assignmentId || !grade) {
      setMessage('Please fill out all fields for grading.');
      return;
    }
    manageGrades(studentEmail, courseId, assignmentId, grade);
    setStudentEmail('');
    setCourseId('');
    setAssignmentId('');
    setGrade('');
    setMessage('Grade submitted successfully!');
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000); 
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (currentUser.role !== 'teacher') {
    return <p className="text-red-600">Access denied. You are not a teacher.</p>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Welcome Teacher, {currentUser.email}!</h1>
      <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded mb-4">Logout</button>

      {message && <div className="text-green-600 mb-4">{message}</div>}

      {/* Courses Overview */}
      <section className="w-full max-w-full lg:max-w-4xl mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Assigned Courses</h2>

        {assignedCourses.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-6">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm lg:text-base text-gray-600">Title</th>
                  <th className="px-4 py-2 text-left text-sm lg:text-base text-gray-600">Description</th>
                  <th className="px-4 py-2 text-left text-sm lg:text-base text-gray-600">Start Date</th>
                  <th className="px-4 py-2 text-left text-sm lg:text-base text-gray-600">End Date</th>
                </tr>
              </thead>
              <tbody>
                {assignedCourses.map(course => (
                  <tr className="hover:bg-gray-100" key={course.id}>
                    <td className="px-4 py-2 text-sm lg:text-base">{course.title}</td>
                    <td className="px-4 py-2 text-sm lg:text-base">{course.description}</td>
                    <td className="px-4 py-2 text-sm lg:text-base">{course.startDate}</td>
                    <td className="px-4 py-2 text-sm lg:text-base">{course.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No courses assigned to you.</p>
        )}
      </section>

      {/* Upload Assignment Section */}
      <section className="w-full max-w-full lg:max-w-4xl mt-10 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Upload Assignment</h2>
        <input
          type="text"
          placeholder="Assignment Title"
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Assignment Description"
          value={assignmentDescription}
          onChange={(e) => setAssignmentDescription(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="file"
          onChange={(e) => setAssignmentFile(e.target.files[0])}
          className="border p-2 w-full mb-2"
        />
        <button onClick={handleAddAssignment} className="bg-blue-600 text-white py-2 px-4 rounded">Add Assignment</button>
      </section>

      {/* Upload Quiz Section */}
      <section className="w-full max-w-full lg:max-w-4xl mt-10 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Upload Quiz</h2>
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Quiz Questions (comma-separated)"
          value={quizQuestions}
          onChange={(e) => setQuizQuestions(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button onClick={handleAddQuiz} className="bg-blue-600 text-white py-2 px-4 rounded">Add Quiz</button>
      </section>

      {/* Manage Grades Section */}
      <section className="w-full max-w-full lg:max-w-4xl mt-10 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Manage Student Grades</h2>
        <input
          type="email"
          placeholder="Student Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Assignment ID"
          value={assignmentId}
          onChange={(e) => setAssignmentId(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button onClick={handleGradeSubmit} className="bg-green-600 text-white py-2 px-4 rounded">Submit Grade</button>
      </section>
    </div>
  );
};

export default TeacherDashboard;
