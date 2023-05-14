import React, { useState, useEffect } from "react";
import AdminNavbar from "../Components/adminNavbar";
import AddQuestion from "../Components/addQuestion";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import axios from 'axios';
import Quiz from "../Components/showQuizes";
Modal.setAppElement("#root");

export default function CourseHome(route) {
  const location = useLocation();
  const { CourseID, name, desc, start, end } = location.state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLearn, setIsModalOpenLearn] = useState(false);
  const [isModalOpenAssess, setIsModalOpenAssess] = useState(false);

  const [announcement, setannouce] = useState([]);
  const [Showannouncement, setShowannouce] = useState([]);
  const [alllearner, setalllearner] = useState();
  //--------------------------------------------------------
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  //--------------------------------------------------------
  const openModalLearner = () => {
    setIsModalOpenLearn(true);
  };

  const closeModallearner = () => {
    setIsModalOpenLearn(false);
  };

  const openModalAssess = () => {
    setIsModalOpenAssess(true);
  };

  const closeModalAssess = () => {
    setIsModalOpenAssess(false);
  };
  //--------------------------------------------------------
  // function submitForm(event) {
  //   event.preventDefault();

  //   fetch('http://localhost:8000/addAnnouncement?name=${CourseID}', {
  //     method: 'POST',
  //     body: formData
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log('Success:', data);
  //     // do something with the response data, like close the modal and refresh the page
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //     // handle the error, like showing an error message to the user
  //   });
  // }

  //------------Retrieve announcements-----------------
  useEffect(() => {

    fetch(`http://localhost:8000/GetAnnounce?name=${CourseID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setShowannouce(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // openModalLearner();
  }, []);



  //--------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(announcement)
    axios.post(`http://localhost:8000/addAnnouncement?name=${CourseID}`, announcement)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    //console.log(e.target.value)
    setannouce({ ...announcement, [e.target.name]: e.target.value });
  };
  //----------------------------------------------------------------
  const fetchLearners = () => {
    const nn = 'CS4555'
    fetch(`http://localhost:8000/GetLearnerByName?name=${CourseID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setalllearner(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    openModalLearner();
  }
  //----------------------------------------------------------------
  return (
    <>
      <AdminNavbar />
      <div className="min-h-full">
        <header className="bg-white shadow ">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {CourseID + '  ' + name}
            </h1>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 mt-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              Add announcement
            </button>
            <button
              onClick={fetchLearners}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 mt-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              ViewLearner
            </button>
            <button
              onClick={openModalAssess}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 mt-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              Add assessment
            </button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <ul role="list" className="divide-y divide-gray-100">
              {Showannouncement && Showannouncement.length > 0 ? (
                Showannouncement.map((person) => (
                  <li key={person.email} className="flex justify-between gap-x-6 py-5 shadow-md">
                    <div className="flex gap-x-4">
                      {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                      <div className="min-w-0 flex-auto">
                        {/* <p className="text-sm font-semibold leading-6 text-black">{person.fname}</p> */}
                        <p className="m-1 truncate text-xs leading-5 text-black">{person.Announcetext}</p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p>No announcements yet.</p>
              )}

            </ul>
          </div>
          <Quiz></Quiz>
        </main>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
          <form>
            <div class="col-span-full">
              <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Make an announcement</label>
              <div class="mt-2">
                <textarea id="about" name="announce" rows="3" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 mt-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                Add announcement
              </button>
              <button
                onClick={closeModal}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 mt-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                Close
              </button>
            </div>
          </form>
        </Modal>
        <Modal isOpen={isModalOpenAssess} onRequestClose={closeModalAssess}>
          {/* <form>
            <div class="col-span-full">
              <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Make an assessment</label>
              <div class="mt-2">
                <textarea id="about" name="announce" rows="3" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 mt-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                Add assessment
              </button>
              <button
                onClick={closeModal}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 mt-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                Close
              </button>
            </div>
          </form> */}
          <AddQuestion></AddQuestion>
        </Modal>
        <Modal isOpen={isModalOpenLearn} onRequestClose={closeModallearner}>
          <ul role="list" className="divide-y divide-gray-100">
            {alllearner && alllearner.length > 0 ? (
              alllearner.map((person) => (
                <li key={person.email} className="flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-4">
                    {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-black">{person.fname}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-black">{person.email}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No learners found.</p>
            )}

          </ul>
        </Modal>
      </div>
    </>
  );
}
