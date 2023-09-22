import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
export function Answer({
  answerData,
  answers,
  event,
  answerValues,
  index,
  deleteOption,
}) {
  const [selected, setIsSelected] = useState(false);

  useEffect(() => {
    const isSelected = answerValues?.some(
      (value) => value.id === event.id && value.realAnswer === index + 1
    );

    setIsSelected(isSelected);
  }, [answerValues, event.id, answers]);

  return (
    <div
      className={
        selected
          ? "bg-gray-700 mx-6 h-16 w-auto mb-4 rounded-md flex items-center justify-between"
          : "bg-gray-200  mx-6 h-16 w-auto mb-4 rounded-md flex items-center justify-between"
      }
    >
      <label
        className={
          selected
            ? "text-white dark:text-gray-400 text-lg ml-4 w-full h-full flex items-center "
            : "text-gray-900 dark:text-gray-400 text-lg ml-4 w-full h-full flex items-center"
        }
        onClick={() => answerData(event, index)}
      >
        {answers}
      </label>
      <button onClick={() => deleteOption(index)} className="mr-5  h-full">
        <ClearIcon />
      </button>
    </div>
  );
}
