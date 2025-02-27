import React, { useRef, useState } from "react";
import './Quiz.css';
import { data } from "../../assets/data";

function Quiz() {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];

    function CheckAnswer(e, answer) {
        if (lock === false) {
            if (question.answer === answer){
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=> prev+1)
            }
            else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.answer -1].current.classList.add("correct");
            }
        }
    };

    function Next () {
        if (lock === true) {
            if (index === data.length -1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong");
                return null;
            })
        }
    };

    function Reset() {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return(
        <div className="Quiz">
            <h1>Quiz App</h1>
            <hr />
            {result?<></>:
                    <>
                        <h2>{index+1}. {question.question}</h2>
                        <ul>
                            <li ref={Option1} onClick={(e) =>{CheckAnswer(e,1)}} >{question.option1}</li>
                            <li ref={Option2} onClick={(e) =>{CheckAnswer(e,2)}} >{question.option2}</li>
                            <li ref={Option3} onClick={(e) =>{CheckAnswer(e,3)}} >{question.option3}</li>
                            <li ref={Option4} onClick={(e) =>{CheckAnswer(e,4)}} >{question.option4}</li>
                        </ul>
                        <button onClick={Next}>Next</button>
                        <div className="index">{index+1} of {data.length} questions</div>
                    </>}
                    {result?<>
                                <h2>Your Score {score} out of {data.length} questions !</h2>
                                <button onClick={Reset} >Reset</button>
                            </>:<></>}
        </div>
    );
}

export default Quiz;