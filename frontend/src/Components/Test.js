import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Test.css';
import Pic1 from '../Assets/Atocion_rupestre.jpg';
import Pic2 from '../Assets/Centranthus_calcitrapae.jpg';
import Pic3 from '../Assets/Cucurbita_moschata.jpg';
import Pic4 from '../Assets/Smilax_rotundifolia.jpg';
import Pic5 from '../Assets/Viscaria_vulgaris.jpg';

const questions = [
  {
    img: Pic1,
    options: ['A. Aegopodium_podagraria', 'B. Alcea_biennis', 'C. Aegopodium_podagraria', 'D. Atocion_rupestre'],
    answer: 'D. Atocion_rupestre',
  },
  {
    img: Pic2,
    options: ['A. Centranthus_calcitrapae', 'B. Viscaria_vulgaris', 'C.Smilax_rotundifolia', 'D. Aegopodium_podagraria'],
    answer: 'A. Centranthus_calcitrapae',
  },
  {
    img: Pic3,
    options: ['A. Barbarea_intermedia', 'B. Cucurbita_moschata', 'C. Atocion_rupestre', 'D. Dorotheanthus_bellidiformis'],
    answer: 'B. Cucurbita_moschata',
  },
  {
    img: Pic4,
    options: ['A. Barbarea_intermedia', 'B. Cucurbita_moschata', 'C. Smilax_rotundifolia', 'D. Dubouzetia_campanulata'],
    answer: 'C. Smilax_rotundifolia',
  },
  {
    img: Pic5,
    options: ['A. Hypericum_empetrifolium', 'B. Smilax_rotundifolia', 'C. Dubouzetia_campanulata', 'D. Viscaria_vulgaris'],
    answer: 'D. Viscaria_vulgaris',
  },
];

const Test = ({ setTestPassed }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(5).fill(''));
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  const handleOptionChange = (index, value) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = value;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correctCount = selectedAnswers.filter((answer, index) => answer === questions[index].answer).length;

    if (correctCount >= 4) {
      alert('Test passed. You can now login.');
      setTestPassed(true);

      try {
        const response = await fetch('http://localhost:8080/teachersignup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Sign up successful');
          navigate('/login'); // Redirect to login page
        } else {
          const errorData = await response.json();
          console.error('Sign up failed', errorData);
          alert('Sign up failed: ' + (errorData.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error: ' + error.message);
      }
    } else {
      alert('You did not pass the test. Please try again.');
      setTestPassed(false);
      navigate('/signup');
    }
  };

  return (
    <div className="test-page">
      <h2>Teacher Verification Test</h2>
      <p>Please name the objects in the images below:</p>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <img src={question.img} alt={`Test ${index + 1}`} className="question-image" />
            <div className="options-container">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${index}`}
                    id={`question-${index}-option-${optionIndex}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={`question-${index}-option-${optionIndex}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Test;
