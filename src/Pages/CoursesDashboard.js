import MyCards from "../Components/cards";
import AdminNavbar from "../Components/adminNavbar";
import React, { useState, useEffect } from 'react';

export default function CourseDash(){
  

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/GetCourses')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  






    return(
        <>
        <AdminNavbar></AdminNavbar>
        {/* <div class="grid grid-cols-5 gap-2 place-items-center h-18 ..."> */}


                
              <>
                <ul class="grid grid-cols-5 gap-10 place-items-center h-18 ...">
      {products.map(product => (
        <li key={product.id}>
          <MyCards mykey= {product.CourseID} name={product.name} desc={product.desc} start={product.start} end={product.end} ></MyCards>
        </li>
      ))}
    </ul>
               
              </>

      
      {/* </div> */}
        </>
    )
}