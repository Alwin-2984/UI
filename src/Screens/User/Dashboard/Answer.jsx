import { useEffect, useState } from "react";

export function Answer({ answerData, answers, event, answerValues }) {
  const [selected, setIsSelected] = useState(false);

  useEffect(() => {
    const isSelected = answerValues.some((value) => (
      value.questinareId === event.questionnaireId && value.realAnswer === answers
    ));
  
    setIsSelected(isSelected);
  }, [answerValues, event.questionnaireId, answers]);
  

  return (
    <div
      className={
        selected
          ? "bg-gray-400 mx-6 h-16 w-auto mb-4 rounded-md flex items-center"
          : "bg-gray-100  mx-6 h-16 w-auto mb-4 rounded-md flex items-center"
      }
      onClick={() => answerData(answers, event)}
    >
      {/* <input
              type="radio"
              name="answer"
              value={answer}
              className={selected ? "ml-5 dark:bg-blue-600" : "ml-5 dark:bg-gray-800"}
            /> */}
      <label
        className={
          selected
            ? "text-white dark:text-gray-400 text-lg ml-4"
            : "text-gray-700 dark:text-gray-400 text-lg ml-4"
        }
      >
        {answers}
      </label>
    </div>
  );
}
