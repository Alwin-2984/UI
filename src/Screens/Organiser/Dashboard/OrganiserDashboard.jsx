import { useState } from "react";
import HardcodedValues from "./HardcodedValues";
import QuizAnswers from "./QuizAnswers";
import AddIcon from "@mui/icons-material/Add";
import GlobalToaster from "../../Components/Toasters/GlobalToaster";
import { questionSubmitApi } from "../../../API/ApiService/EventListApi/EventListApi";
const OrganiserDashboard = () => {
  const [answerValues, setEventValues] = useState([]);
  const [option, setOption] = useState("");
  const [options, setOptions] = useState([]); // Use an array to store options
  const [question, setQuestion] = useState("");
  const [level, setLevel] = useState(0);

  const questionData = {
    id: 1,
  };

  const answerData = (event, index) => {
    // Filter out previous entries with the same questionnaireId
    const filteredValues = answerValues?.filter(
      (value) => value.id !== event.id
    );

    // Add the latest entry for the current questionnaireId
    // index + 1 because array index starts from 0 and question options start from 1
    setEventValues([
      ...filteredValues,
      {
        id: event.id,
        realAnswer: index + 1,
      },
    ]);
  };

  const handleOptions = () => {
    if (option === "") {
      GlobalToaster("Enter an option", 405, ["error"], 3000);

      return;
    }
    setOptions([...options, option]); // Add the option to the array
    setOption("");
  };

  const deleteOption = (indexToRemove) => {
    // Remove the option at the specified index
    const updatedOptions = options.filter(
      (_, index) => index !== indexToRemove
    );
    setOptions(updatedOptions);
    if (updatedOptions.length === 0) {
      setEventValues([]);
    }
  };

  const submitQuestion = () => {
    if (question === "") {
      GlobalToaster("Enter Question", 405, ["error"], 3000);
      return;
    }
    if (!level) {
      GlobalToaster("select a level", 405, ["error"], 3000);
      return;
    }
    if (options.length === 0) {
      GlobalToaster("options required", 405, ["error"], 3000);
      return;
    }

    if (!answerValues[0]?.realAnswer) {
      GlobalToaster("select an option as real answer", 405, ["error"], 3000);
      return;
    }

    questionSubmitApi({
      question: question,
      level: level,
      realAnswer: answerValues[0]?.realAnswer,
      answers: options,
    })
      .then(() => {
        setEventValues([]);
        setOption("");
        setOptions([]);
        setQuestion("");
        setLevel(0);
        GlobalToaster("Question added", 405, ["error"], 3000);
      })
      .catch((err) => {
        GlobalToaster("Error occured", 405, ["error"], 3000);
      });
  };

  return (
    <div className="relative">
      <div className="w-screen h-[90vh] overflow-y-scroll flex justify-center items-center pt-8">
        <div className="w-[56vw] max-md:w-[70vw] max-sm:w-[85vw] h-full">
          <div className="mb-4 flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-2xl font-semibold break-words max-md:text-lg text-gray-900 mb-3">
                Question
              </label>
              <input
                className="w-full shadow-inner p-4 border-0"
                type="text"
                name="name"
                placeholder="Enter the Question"
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-2xl font-semibold break-words max-md:text-lg text-gray-900 mb-3">
                Level
              </label>
              <select
                required
                name="eventCategory"
                className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
              >
                <option value={false}>select</option>
                <option value={0}>Level 1</option>
                <option value={1}>Level 2</option>
                <option value={2}>Level 3</option>
                <option value={3}>Level 4</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-2xl font-semibold break-words max-md:text-lg text-gray-900 mb-3">
                Options
              </label>
              <div className="flex flex-row">
                <input
                  className="w-full shadow-inner p-4 border-0"
                  type="text"
                  placeholder="Enter the option"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                  required
                />
                <button onClick={handleOptions}>
                  <AddIcon />
                </button>
              </div>
            </div>
          </div>
          {options.length != 0 && (
            <>
              <div>click select real answer</div>
              <QuizAnswers
                event={questionData}
                answerData={answerData}
                answerValues={answerValues}
                options={options}
                deleteOption={deleteOption}
              />
            </>
          )}
          <button
            onClick={submitQuestion}
            className=" bg-gray-700 text-white text-sm rounded-lg py-2.5 px-2.5 hover:bg-red-500 focus:ring w-32 mt-10 mb-10"
          >
            {HardcodedValues.submit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganiserDashboard;
