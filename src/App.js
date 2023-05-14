import './App.css';
import LogIn from './Pages/Login';
import {BrowserRouter, Route, Routes } from "react-router-dom"
// import Dashboard from './Pages/Dashboard';
import AdminDashboard from './Pages/AdminDashboard';
import CourseDash from './Pages/CoursesDashboard';
import CourseAdd from './Pages/addCourse';
import LearnerAdd from './Pages/addLearner';
import CourseHome from './Pages/CourseHome';
function App() {
  return (
    <div>
      
    
      <BrowserRouter>
      
    <Routes>
        <Route exact path='/' element = {<LogIn/>}></Route>
        <Route exact path='/Home' element = {<AdminDashboard></AdminDashboard>}></Route>
        <Route exact path='/Courses' element = {<CourseDash></CourseDash>}></Route>
        <Route exact path='/AddCourses' element = {<CourseAdd></CourseAdd>}></Route>
        <Route exact path='/Addlearner' element = {<LearnerAdd></LearnerAdd>}></Route>
        <Route exact path='/CourseHome' element = {<CourseHome></CourseHome>}></Route>
        
        
    </Routes>

    </BrowserRouter>

      
    </div>
  )
}

export default App;
