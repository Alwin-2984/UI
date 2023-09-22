import { useEffect, useState } from "react";

export function Answer({ answerData, answers, event, answerValues, index }) {
  const [selected, setIsSelected] = useState(false);

  useEffect(() => {
    const isSelected = answerValues.some(
      (value) =>
        value.questinareId === event.questionnaireId &&
        value.realAnswer === index + 1
    );

    setIsSelected(isSelected);
  }, [answerValues, event.questionnaireId, answers]);

  return (
    <div
      className={
        selected
          ? "bg-gray-700 mx-6 h-16 w-auto mb-4 rounded-md flex items-center"
          : "bg-gray-200  mx-6 h-16 w-auto mb-4 rounded-md flex items-center"
      }
      onClick={() => answerData(event, index)}
    >
      <label
        className={
          selected
            ? "text-white dark:text-gray-400 text-lg ml-4"
            : "text-gray-900 dark:text-gray-400 text-lg ml-4"
        }
      >
        {answers}
      </label>
    </div>
  );
}
