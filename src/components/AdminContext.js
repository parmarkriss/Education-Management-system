import React, { createContext, useState, useEffect } from 'react';

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const storedCourses = localStorage.getItem('courses');
    return storedCourses ? JSON.parse(storedCourses) : [];
  });

  const [grades, setGrades] = useState(() => {
    const savedGrades = localStorage.getItem('grades');
    return savedGrades ? JSON.parse(savedGrades) : [];
  });

  const [assignments, setAssignments] = useState(() => {
    const storedAssignments = localStorage.getItem('assignments');
    return storedAssignments ? JSON.parse(storedAssignments) : [];
  });
  const [assignmentIdCounter, setAssignmentIdCounter] = useState(1);

  const [quizzes, setQuizzes] = useState(() => {
    const storedQuizzes = localStorage.getItem('quizzes');
    return storedQuizzes ? JSON.parse(storedQuizzes) : [];
  });

  const addCourse = (course) => {
    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses, course];
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      return updatedCourses;
    });
  };

  const editCourse = (id, updatedCourse) => {
    setCourses((prevCourses) => {
      const updatedCourses = prevCourses.map(course =>
        course.id === id ? updatedCourse : course
      );
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      return updatedCourses;
    });
  };

  const deleteCourse = (id) => {
    setCourses((prevCourses) => {
      const updatedCourses = prevCourses.filter(course => course.id !== id);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      return updatedCourses;
    });
  };

  const addAssignment = (assignment) => {
    const newAssignment = { id: assignmentIdCounter, ...assignment };
    setAssignments((prevAssignments) => {
      const updatedAssignments = [...prevAssignments, newAssignment];
      localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
      return updatedAssignments;
    });
    setAssignmentIdCounter(assignmentIdCounter + 1);
  };

  const addQuiz = (quiz) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes, quiz];
      localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
      return updatedQuizzes;
    });
  };

  const manageGrades = (studentEmail, courseId, assignmentId, grade) => {
    const newGrade = { studentEmail, courseId, assignmentId, grade };

    const updatedGrades = [...grades, newGrade];
    localStorage.setItem('grades', JSON.stringify(updatedGrades));
    setGrades(updatedGrades); 
  };

  useEffect(() => {
    const storedAssignments = JSON.parse(localStorage.getItem('assignments')) || [];
    setAssignments(storedAssignments);
    setAssignmentIdCounter(storedAssignments.length + 1);
  }, []);

  return (
    <AdminContext.Provider value={{ 
      courses, 
      assignments, 
      quizzes, 
      addCourse, 
      editCourse, 
      deleteCourse, 
      addAssignment, 
      addQuiz, 
      manageGrades, 
      grades  
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
