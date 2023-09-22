import { useState } from "react";
import HardcodedValues from "./HardcodedValues";
import QuizAnswers from "./QuizAnswers";

const OrganiserDashboard = () => {
  const [answerValues, setEventValues] = useState([]);

  const [questionData, setQuestionData] = useState({
    question: "test question level 1 : answer1",
    level: 0,
    answers: ["answer1", "answer2", "answer3", "answer4"],
    realAnswer: 1,
  });

  const answerData = (event, index) => {
    // Filter out previous entries with the same questionnaireId
    const filteredValues = answerValues?.filter(
      (value) => value.questinareId !== event.questionnaireId
    );

    // Add the latest entry for the current questionnaireId
    // index + 1 because array index starts from 0 and question options starts from 1 so we need to add one digit
    setEventValues([
      ...filteredValues,
      {
        questinareId: event.questionnaireId,
        realAnswer: index + 1,
      },
    ]);
  };

  return (
    <div className="relative">
      <div className="w-screen h-[90vh] overflow-y-scroll flex justify-center items-center">
        <div className="w-max h-max">
          <div className="text-2xl font-semibold break-words max-md:text-lg text-gray-900 mb-3">
            Q:{questionData.question}
          </div>
          <QuizAnswers
            event={questionData}
            answerData={answerData}
            answerValues={answerValues}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganiserDashboard;