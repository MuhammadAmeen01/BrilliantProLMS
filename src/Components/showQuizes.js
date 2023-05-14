import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/getMCQ')
      .then(response => {
        setSurvey(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {console.log(survey)}
       { survey.map((questionNo, index) => (
      
      <form>
        <h2>{questionNo.title}</h2>
        {console.log(questionNo.title)}
        {questionNo.questions.map((question, index) => (
          <div key={index}>
            <h3>{question.text}</h3>
            {question.options.map((option, index) => (
              <div key={index}>
                <input type="checkbox" name={option.value} checked={option.checked} />
                <label>{option.text}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      ))}
    </div>
            
  );
};

export default Quiz;
