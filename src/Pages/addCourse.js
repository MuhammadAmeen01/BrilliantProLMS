/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import AdminNavbar from '../Components/adminNavbar'
import { useState } from 'react';
import axios from 'axios';
// import input from '@tailwindcss/forms'
export default function CourseAdd() {
  const [learnerData, setLearnerData] = useState({
    CourseID:'',
    name: '',
    desc:'',
    start: '',
    end:'',

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(learnerData)
    axios.post('http://localhost:8000/addCourse', learnerData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    //console.log(e.target.value)
    setLearnerData({ ...learnerData, [e.target.name]: e.target.value });
  };
  return (
    <>
    <AdminNavbar></AdminNavbar>
    <form onSubmit={handleSubmit}>
  <div class="space-y-12 m-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Add a new course</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">You can add a new course here</p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input type="text" name="name" id="username" autocomplete="username" onChange={handleChange} class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith"/>
            </div>
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">CourseID</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input type="text" name="CourseID" id="username" autocomplete="username" onChange={handleChange} class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith"/>
            </div>
          </div>
        </div>

        <div class="col-span-full">
          <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Course Overview</label>
          <div class="mt-2">
            <textarea id="about" name="desc" rows="3" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">Describe the course</p>
        </div>
        <div class="col-span-full">
        <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Start Date</label>
        <input type="date" id="start" name="start" onChange={handleChange}/>
        </div>
        <div class="col-span-full">
        <label for="about" class="block text-sm font-medium leading-6 text-gray-900">End Date</label>
        <div class="mt-2">
        <input type="date" id="end" name="end" onChange={handleChange} />
        </div>
        </div>
        
      </div>
    </div>

    
  </div>

  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
  </div>
</form>
    </>
  )
}
