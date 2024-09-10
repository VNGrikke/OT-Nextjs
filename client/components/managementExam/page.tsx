"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExam,
  getExams,
  updateExam,
  deleteExam,
} from "@/services/exam.service";

export default function ExamManagementPanel() {
  const dispatch: any = useDispatch();
  const { exams, loading, error } = useSelector((state: any) => state.exams);
  const [newExam, setNewExam] = useState<any>({
    title: "",
    description: "",
    examSubjectId: 0,
    duration: 0,
  });
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentExam, setCurrentExam] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const examsPerPage = 10;

  useEffect(() => {
    dispatch(getExams());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (!newExam.title || !newExam.description || !newExam.examSubjectId || !newExam.duration) {
      setFormError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      if (editMode && currentExam) {
        await dispatch(
          updateExam({
            id: currentExam.id,
            title: newExam.title,
            description: newExam.description,
            examSubjectId: newExam.examSubjectId,
            duration: newExam.duration,
          })
        );
      } else {
        await dispatch(addExam(newExam));
      }
      setNewExam({ title: "", description: "", examSubjectId: 0, duration: 0 });
      setShowForm(false);
      setEditMode(false);
      setCurrentExam(null);
      setSearchQuery("");
      dispatch(getExams());
    } catch (error) {
      console.error("Thao tác không thành công:", error);
    }
  };

  const handleDelete = async (examId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài kiểm tra này?")) {
      try {
        await dispatch(deleteExam(examId));
        dispatch(getExams());
      } catch (error) {
        console.error("Xóa bài kiểm tra không thành công:", error);
      }
    }
  };

  const handleEdit = (exam: any) => {
    setCurrentExam(exam);
    setNewExam({
      title: exam.title,
      description: exam.description,
      examSubjectId: exam.examSubjectId,
      duration: exam.duration,
    });
    setEditMode(true);
    setShowForm(true);
  };

  const filteredExams =
    exams?.filter(
      (exam: any) =>
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const indexOfLastExam = (currentPage + 1) * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const displayedExams = filteredExams.slice(indexOfFirstExam, indexOfLastExam);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredExams.length / examsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Exam Management Panel
      </h2>

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
          setCurrentExam(null);
          setNewExam({ title: "", description: "", examSubjectId: 0, duration: 0 });
        }}
        className="mb-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        Add New Exam
      </button>

      {/* Modal for Add/Edit Exam */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {editMode ? "Edit Exam" : "Add New Exam"}
            </h3>
            <form onSubmit={handleSubmit}>
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
                  placeholder="Exam Subject ID"
                  value={newExam.examSubjectId}
                  onChange={(e) => setNewExam({ ...newExam, examSubjectId: parseInt(e.target.value) })}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={newExam.duration}
                  onChange={(e) => setNewExam({ ...newExam, duration: parseInt(e.target.value) })}
                  className="border p-2 rounded"
                />
              </div>
              {formError && <p className="text-red-500 mt-2">{formError}</p>}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editMode ? "Update Exam" : "Add Exam"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Displaying the Exams */}
      {Array.isArray(displayedExams) && displayedExams.length > 0 ? (
        <div>
          <table className="table-auto w-full border-collapse border border-gray-400 bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">STT</th>
                <th className="border border-gray-400 px-4 py-2">Exam Title</th>
                <th className="border border-gray-400 px-4 py-2">Description</th>
                <th className="border border-gray-400 px-4 py-2">Exam Subject ID</th>
                <th className="border border-gray-400 px-4 py-2">Duration</th>
                <th className="border border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedExams.map((exam: any, index: number) => (
                <tr key={exam.id}>
                  <td className="border border-gray-400 px-4 py-2">
                    {index + 1 + currentPage * examsPerPage}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">{exam.title}</td>
                  <td className="border border-gray-400 px-4 py-2">{exam.description}</td>
                  <td className="border border-gray-400 px-4 py-2">{exam.examSubjectId}</td>
                  <td className="border border-gray-400 px-4 py-2">{exam.duration} mins</td>
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

          {/* Pagination */}
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
                className={`px-4 py-2 ${currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
