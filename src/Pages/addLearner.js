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
import { useEffect, useState } from 'react';
import axios from 'axios';

// import input from '@tailwindcss/forms'
export default function LearnerAdd() {

    const [learnerData, setLearnerData] = useState({
        fname: '',
        lname:'',
        email: '',
        password:'',
      course:'',
      });
      
      const [courses, setCourses] = useState([]);

      useEffect(() => {
        axios.get('http://localhost:8000/GetCourses')
          .then(res => {
            const courseIds = res.data.map(courses => courses.CourseID);
            setCourses(courseIds);
          })
          .catch(err => console.log(err));
      }, []);
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(learnerData)
        axios.post('http://localhost:8000/addlearner', learnerData)
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
      <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600"></p>

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
          <div class="mt-2">
            <input type="text" name="fname" id="fname" autocomplete="given-name" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
      </div>

        <div class="sm:col-span-3">
          <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
          <div class="mt-2">
            <input type="text" name="lname" id="lname" autocomplete="family-name" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Course ID</label>
          <div class="mt-2">
          <select id="course" name="course" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option onChange={handleChange} name='course' value="">Select a course</option>
            {courses.map(courseId => (
              <option key={courseId} value={courseId}>{courseId}</option>
            ))}
          </select>
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
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
