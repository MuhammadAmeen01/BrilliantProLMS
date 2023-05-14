import DashDetails from "../Components/DashDetails";
import AdminNavbar from "../Components/adminNavbar";
import { useState, useEffect } from 'react';
export default function AdminDashboard() {
    


  const [people, setPeople] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    console.log("HJHJHJHJH")
    fetch('http://localhost:3000/admin/totalLearners')
      .then(response => response.json())
      .then(data => {
        setPeople(data);
        console.log(data)
        // setCourses(data.courses);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // rest of the component code

    return (
        <>
            <AdminNavbar></AdminNavbar>
            <header class="bg-white shadow">
                <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                        Dashboard
                    </h1>
                </div>
            </header>
            <main>
                <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"></div>
            </main>
            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <DashDetails></DashDetails>
            </div>
        </>
    );
}
