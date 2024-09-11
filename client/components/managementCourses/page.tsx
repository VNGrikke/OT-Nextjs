"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, addCourse, updateCourse, deleteCourse } from '@/services/courses.service';

export default function ManagementPanel() {
  const dispatch: any = useDispatch();
  const { courses, loading, error } = useSelector((state: any) => state.courses);
  const [newCourse, setNewCourse] = useState<any>({
    title: '',
    description: '',
  });
  const [formError, setFormError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const coursesPerPage = 10;

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (!newCourse.title || !newCourse.description) {
      setFormError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      if (editMode && currentCourse) {
        await dispatch(updateCourse({
          id: currentCourse.id,
          title: newCourse.title,
          description: newCourse.description,
        }));
      } else {
        await dispatch(addCourse(newCourse));
      }
      setNewCourse({ title: '', description: '' });
      setShowForm(false);
      setEditMode(false);
      setCurrentCourse(null);
      setSearchQuery(''); // Clear search query
      dispatch(getCourses()); // Refresh the course list
    } catch (error) {
      console.error('Thao tác không thành công:', error);
    }
  };

  const handleDelete = async (courseId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      try {
        await dispatch(deleteCourse(courseId));
        dispatch(getCourses()); // Refresh the course list
      } catch (error) {
        console.error('Xóa khóa học không thành công:', error);
      }
    }
  };

  const handleEdit = (course: any) => {
    setCurrentCourse(course);
    setNewCourse({
      title: course.title,
      description: course.description,
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleCancel = () => {
    setNewCourse({ title: '', description: '' });
    setShowForm(false);
    setEditMode(false);
    setCurrentCourse(null);
  };

  const filteredCourses = courses?.filter((course: any) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const indexOfLastCourse = (currentPage + 1) * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const displayedCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Course Management Panel</h2>

      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        onClick={() => {
          setShowForm(true);
          setEditMode(false);
          setCurrentCourse(null);
          setNewCourse({ title: '', description: '' });
        }}
        className="mb-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        Add New Course
      </button>

      {/* Modal for Add/Edit Course */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {editMode ? 'Edit Course' : 'Add New Course'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Course Title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="border p-2 rounded"
                />
                <textarea
                  placeholder="Course Description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="border p-2 rounded"
                />
              </div>
              {formError && <p className="text-red-500 mt-2">{formError}</p>}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editMode ? 'Update Course' : 'Add Course'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course table */}
      {Array.isArray(displayedCourses) && displayedCourses.length > 0 ? (
        <div>
          <table className="table-auto w-full border-collapse border border-gray-400 bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">STT</th>
                <th className="border border-gray-400 px-4 py-2">Course Title</th>
                <th className="border border-gray-400 px-4 py-2">Description</th>
                <th className="border border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedCourses.map((course: any, index: number) => (
                <tr key={course.id}>
                  <td className="border border-gray-400 px-4 py-2">{index + 1 + currentPage * coursesPerPage}</td>
                  <td className="border border-gray-400 px-4 py-2">{course.title}</td>
                  <td className="border border-gray-400 px-4 py-2">{course.description}</td>
                  <td className="border border-gray-400 px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
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
        <p className="text-center text-gray-500">No courses found</p>
      )}
    </div>
  );
}
