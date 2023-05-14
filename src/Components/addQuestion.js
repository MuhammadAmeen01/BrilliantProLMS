import React, { useState } from 'react';

export default function AddQuestion() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleQuestionChange = (index, event) => {
        const { name, checked } = event.target;
        const updatedQuestions = [...questions];
        updatedQuestions[index].options.find(option => option.value === name).checked = checked;
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: '', options: [{ text: '', value: '', checked: false }] }]);
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleAddOption = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options.push({ text: '', value: '', checked: false });
        setQuestions(updatedQuestions);
    };

    const handleRemoveOption = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          const response = await fetch('http://localhost:8000/MCQ', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, questions }),
          });
      
          if (response.ok) {
            // handle success
          } else {
            // handle error
          }
        } catch (error) {
          // handle error
        }
      };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Open Modal</button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Survey</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="sm:col-span-4">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Question Statement
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="title"
                                            onChange={handleTitleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Questions:</label>
                                {questions.map((question, questionIndex) => (
                                    <div key={questionIndex}>
                                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" value={question.text} onChange={(event) => {
                                            const updatedQuestions = [...questions];
                                            updatedQuestions[questionIndex].text = event.target.value;
                                            setQuestions(updatedQuestions);
                                        }} />
                                        <button className="-flex items-inlinecenter justify-center rounded-md p-2 text-gray-700 my-4 bg-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" type="button" onClick={() => handleRemoveQuestion(questionIndex)}>Remove Question</button>
                                        <br />
                                        {question.options.map((option, optionIndex) => (
                                            <div key={optionIndex}>
                                                {/*  */}
                                                <div className="relative flex gap-x-3">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            id="candidates"
                                                            name={option.value}
                                                            checked={option.checked}
                                                            onChange={(event)=>handleQuestionChange(questionIndex,event)}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className="text-sm leading-6">
                                                    <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" value={option.text} onChange={(event) => {
                                                    const updatedQuestions = [...questions];
                                                    updatedQuestions[questionIndex].options[optionIndex].text = event.target.value;
                                                    setQuestions(updatedQuestions);
                                                }} />
                                                        
                                                    </div>
                                                </div>
                                                {/*  */}
                                                {/* <input type="checkbox" name={option.value} checked={option.checked} onChange={(event) => handleQuestionChange(questionIndex, event)} />
                                                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" value={option.text} onChange={(event) => {
                                                    const updatedQuestions = [...questions];
                                                    updatedQuestions[questionIndex].options[optionIndex].text = event.target.value;
                                                    setQuestions(updatedQuestions);
                                                }} /> */}
                                                <button className="-flex items-inlinecenter justify-center rounded-md p-2 text-gray-700 my-4 bg-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" type="button" onClick={() => handleRemoveOption(questionIndex, optionIndex)}>Remove Option</button>
                                                
                                            </div>
                                        ))}
                                        
                                        <br></br>
                                        <button className="-flex items-inlinecenter justify-center rounded-md p-2 text-gray-700 my-4 bg-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" type="button" onClick={() => handleAddOption(questionIndex)}>Add Option</button>
                                        <div>-----------------------------------------------------------</div>
                                        <br />
                                    </div>
                                ))}
                                <button className="-flex items-inlinecenter justify-center rounded-md p-2 text-gray-700 my-4 bg-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" type="button" onClick={handleAddQuestion}>Add Question</button>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
