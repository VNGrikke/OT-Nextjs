"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from '@/services/questionBank.service';

export default function QuestionManagement() {
    const dispatch: any = useDispatch();
    const { questions, loading, error } = useSelector((state: any) => state.questionBank);
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 8;

    const [newQuestion, setNewQuestion] = useState<any>({
        question: '',
        options: ['', '', '', ''],
        answer: '',  // This should be the value of the correct option
        examId: 1, // Example examId
    });
    const [formError, setFormError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch]);

    // Handle form submission to add or update a question
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError('');

        if (!newQuestion.question || newQuestion.options.some((option: string) => !option) || !newQuestion.answer || !newQuestion.examId) {
            setFormError('Please fill out all fields.');
            return;
        }

        try {
            if (editMode && currentQuestion) {
                await dispatch(updateQuestion({
                    id: currentQuestion.id,
                    ...newQuestion,
                }));
            } else {
                await dispatch(addQuestion(newQuestion));
            }
            resetForm();
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    // Reset form state
    const resetForm = () => {
        setNewQuestion({ question: '', options: ['', '', '', ''], answer: '', examId: 1 });
        setShowForm(false);
        setEditMode(false);
        setCurrentQuestion(null);
        dispatch(getQuestions()); // Refresh questions list
    };

    // Handle question deletion
    const handleDelete = async (questionId: number) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await dispatch(deleteQuestion(questionId));
                dispatch(getQuestions()); // Refresh questions list
            } catch (error) {
                console.error('Failed to delete question:', error);
            }
        }
    };

    // Handle edit button click
    const handleEdit = (question: any) => {
        setCurrentQuestion(question);
        setNewQuestion({
            question: question.question,
            options: question.options,
            answer: question.answer,
            examId: question.examId,
        });
        setEditMode(true);
        setShowForm(true);
    };

    // Handle close button click
    const handleCloseForm = () => {
        resetForm();
        setShowForm(false);
        setEditMode(false);
        setCurrentQuestion(null);
    };

    // Pagination logic
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const totalPages = Math.ceil(questions.length / questionsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="relative p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Question Management Panel</h2>

            {/* Button to show the form */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => {
                        setShowForm(prevShowForm => !prevShowForm);
                    }}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
                >
                    Add New Question
                </button>
            </div>

            {/* Form to add or update a question */}
            {showForm && (
                <div className="fixed top-0 left-0 w-full  h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-8xl mx-auto relative w-1/4">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">{editMode ? 'Edit Question' : 'Add New Question'}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder="Question Content"
                                value={newQuestion.question}
                                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            {newQuestion.options.map((option: string, index: number) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => {
                                        const updatedOptions = [...newQuestion.options];
                                        updatedOptions[index] = e.target.value;
                                        setNewQuestion({ ...newQuestion, options: updatedOptions });
                                    }}
                                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                            ))}
                            <select
                                value={newQuestion.answer}
                                onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            >
                                <option value="">Select Correct Option</option>
                                {newQuestion.options.map((option: string, index: number) => (
                                    <option key={index} value={option}>
                                        Correct Option {index + 1}: {option}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Exam ID"
                                value={newQuestion.examId}
                                onChange={(e) => setNewQuestion({ ...newQuestion, examId: Number(e.target.value) })}
                                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                        </div>
                        {formError && <p className="text-red-500 mt-2">{formError}</p>}
                        <div className="flex justify-between mt-4">
                            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all">
                                {editMode ? 'Update Question' : 'Add Question'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCloseForm}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Questions */}
            <div className="mt-6">
                {questions && (
                    <div className="grid grid-cols-4 gap-8">
                        {currentQuestions.map((question: any) => (
                            <div
                                key={question.id}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                                <p className="text-base font-medium text-gray-800 truncate w-full" style={{ maxWidth: '200px' }}>
                                    {question.question}
                                </p>
                                <ul className="list-disc pl-4 mt-2 text-sm">
                                    {question.options.map((option: string, index: number) => (
                                        <li
                                            key={index}
                                            className={`truncate ${question.answer === option ? 'font-bold text-green-600' : ''}`}
                                            style={{ maxWidth: '200px' }}
                                        >
                                            {option}
                                            {question.answer === option && ' (Correct Answer)'}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-between mt-4 space-x-2">
                                    <button
                                        onClick={() => handleEdit(question)}
                                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-all text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(question.id)}
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`py-2 px-4 rounded-lg mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                            } hover:bg-blue-500 hover:text-white transition-all`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
