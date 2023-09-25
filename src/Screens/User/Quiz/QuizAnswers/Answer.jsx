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

  const optionLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div
      className={
        selected
          ? "bg-gray-700 mx-6 h-16 w-auto mb-4 rounded-md flex items-center "
          : "bg-gray-200  mx-6 h-16 w-auto mb-4 rounded-md flex items-center hover:bg-gray-300"
      }
      onClick={() => answerData(event, index)}
    >
      <label
        className={
          selected
            ? "text-white dark:text-gray-400 text-lg ml-4 flex flex-row"
            : "text-gray-900 dark:text-gray-400 text-lg ml-4 flex flex-row"
        }
      >
        <div>({optionLetters[index]})&nbsp;</div>
        {answers}
      </label>
    </div>
  );
}
