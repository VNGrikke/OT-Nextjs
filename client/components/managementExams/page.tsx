"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExams, addExam, updateExam, deleteExam } from '@/services/exams.service';

export default function ExamManagementPanel() {
  const dispatch: any = useDispatch();
  const { exams, loading, error } = useSelector((state: any) => state.exams);
  const [newExam, setNewExam] = useState<any>({
    title: '',
    description: '',
    courseId: 0,
  });
  const [formError, setFormError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentExam, setCurrentExam] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const examsPerPage = 10;

  useEffect(() => {
    dispatch(getExams());
  }, [dispatch]);

  // Handle form submission to add or update an exam
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (!newExam.title || !newExam.description || !newExam.courseId) {
      setFormError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      if (editMode && currentExam) {
        await dispatch(updateExam({
          id: currentExam.id,
          title: newExam.title,
          description: newExam.description,
          courseId: newExam.courseId,
        }));
      } else {
        await dispatch(addExam(newExam));
      }
      setNewExam({ title: '', description: '', courseId: 0 });
      setShowForm(false);
      setEditMode(false);
      setCurrentExam(null);
      setSearchQuery(''); // Clear search query
      dispatch(getExams()); // Refresh the exam list
    } catch (error) {
      console.error('Thao tác không thành công:', error);
    }
  };

  // Handle exam deletion
  const handleDelete = async (examId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài kiểm tra này?')) {
      try {
        await dispatch(deleteExam(examId));
        dispatch(getExams()); // Refresh the exam list
      } catch (error) {
        console.error('Xóa bài kiểm tra không thành công:', error);
      }
    }
  };

  // Handle edit button click
  const handleEdit = (exam: any) => {
    setCurrentExam(exam);
    setNewExam({
      title: exam.title,
      description: exam.description,
      courseId: exam.courseId,
    });
    setEditMode(true);
    setShowForm(true);
  };

  // Filter exams based on search query
  const filteredExams = exams?.filter((exam: any) =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Calculate displayed exams
  const indexOfLastExam = (currentPage + 1) * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const displayedExams = filteredExams.slice(indexOfFirstExam, indexOfLastExam);

  // Change page handler
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const totalPages = Math.ceil(filteredExams.length / examsPerPage);
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Exam Management Panel</h2>

      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by title or description"
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
          setCurrentExam(null);
          setNewExam({ title: '', description: '', courseId: 0 });
        }}
        className="mb-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        {showForm ? 'Hide Form' : 'Add New Exam'}
      </button>

      {/* Form to add or update an exam */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto fixed top-16 left-1/2 transform -translate-x-1/2 z-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            {editMode ? 'Edit Exam' : 'Add New Exam'}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newExam.title}
              onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
              className="border p-2 rounded"
            />
            <textarea
              placeholder="Description"
              value={newExam.description}
              onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Course ID"
              value={newExam.courseId}
              onChange={(e) => setNewExam({ ...newExam, courseId: parseInt(e.target.value) })}
              className="border p-2 rounded"
            />
          </div>
          {formError && <p className="text-red-500 mt-2">{formError}</p>}
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {editMode ? 'Update Exam' : 'Add Exam'}
          </button>
        </form>
      )}

      {/* Exam table */}
      {Array.isArray(displayedExams) && displayedExams.length > 0 ? (
        <div>
          <table className="table-auto w-full border-collapse border border-gray-400 bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">STT</th>
                <th className="border border-gray-400 px-4 py-2">Exam Title</th>
                <th className="border border-gray-400 px-4 py-2">Description</th>
                <th className="border border-gray-400 px-4 py-2">Course ID</th>
                <th className="border border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedExams.map((exam: any, index: number) => (
                <tr key={exam.id}>
                  <td className="border border-gray-400 px-4 py-2">{index + 1 + currentPage * examsPerPage}</td>
                  <td className="border border-gray-400 px-4 py-2">{exam.title}</td>
                  <td className="border border-gray-400 px-4 py-2">{exam.description}</td>
                  <td className="border border-gray-400 px-4 py-2">{exam.courseId}</td>
                  <td className="border border-gray-400 px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(exam)}
                      className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exam.id)}
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
        <p className="text-center text-gray-600">No exams found</p>
      )}
    </div>
  );
}
