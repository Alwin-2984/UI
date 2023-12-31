import { useEffect, useState } from "react";
import {
  answersSubmitApi,
  currentScoreApi,
  questionListApi,
  resetScoreApi,
} from "../../../../API/ApiService/EventListApi/EventListApi";
import QuizAnswers from "../QuizAnswers/QuizAnswers";
import GlobalToaster from "../../../Components/Toasters/GlobalToaster";
import HardcodedValues from "../../Dashboard/HardcodedValues";
import Swal from "sweetalert2";

const QuizList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [questionAnswerList, setQuestionAnswerList] = useState([]);
  const [answerValues, setEventValues] = useState([]);
  const [questionCount, setQuestionCount] = useState(undefined);
  const [score, setScore] = useState(undefined);

  useEffect(() => {
    questionsFetchApiCall();
  }, []);

  useEffect(() => {
    setQuestionCount(questionAnswerList.length - answerValues.length);
  }, [answerValues]);

  const questionsFetchApiCall = () => {
    questionListApi()
      .then((response) => {
        setQuestionAnswerList(response?.data);
        setIsLoading(false);
        setQuestionCount(response?.data.length);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    currentScoreApi()
      .then((response) => {
        setScore(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const answerData = (event, index) => {
    // Filter out previous entries with the same questionnaireId
    const filteredValues = answerValues.filter(
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

  const goToTop = () => {
    const topOfPageElement = document.getElementById("topOfPage");
    topOfPageElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const submitAnswer = async () => {
    if (questionCount === 0) {
      try {
        const response = await answersSubmitApi(answerValues);
        setScore(undefined);
        setEventValues([]);
        questionsFetchApiCall();
        goToTop();

        if (response?.data.message === "success") {
          GlobalToaster("submitted", 405, ["success"], 3000);
        } else if (response?.data.message === "passed") {
          GlobalToaster(
            "You've reached the highest level. Continue with high-level questions",
            406,
            ["success"],
            3000
          );
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      GlobalToaster("answer all questions", 405, ["error"], 3000);
      goToTop();
    }
  };

  const resetScoreFunction = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        await resetScoreApi();
        Swal.fire(
          "Reset Successfully",
          "Your progress has been deleted.",
          "success"
        );
        setScore(undefined);
        questionsFetchApiCall();
      }
    } catch (error) {
      console.error(error);
      GlobalToaster("Error! Try again", 405, ["error"], 3000);
    }
  };

  return (
    <div className="relative">
      <div
        id="topOfPage"
        className="w-screen h-[90vh] overflow-y-scroll bg-[whitesmoke]"
      >
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div className="w-full flex justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                {HardcodedValues.YourQuestions}
              </div>
              <div className="w-full flex justify-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
                {questionAnswerList[0]?.level}
              </div>
              <div className="2xl:absolute 2xl:top-3 2xl:left-3 max-2xl::w-full max-2xl:flex max-2xl:justify-center text-lg font-semibold break-words max-2xl:text-lg text-gray-900">
                {questionCount} Questions remaining
              </div>
              {score && (
                <div className="2xl:absolute 2xl:top-10 2xl:left-3 max-2xl::w-full max-2xl:flex max-2xl:justify-center text-[1.7rem] font-semibold break-words max-2xl:text-lg text-gray-900">
                  {HardcodedValues.CurrentScore} {score?.totalPoints}/
                  {score?.totalQuestionCount}
                </div>
              )}
              {questionAnswerList.length == 0 && (
                <div className="w-full flex justify-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
                  {HardcodedValues.YourAllCaughtUp}
                </div>
              )}
              <div className="w-full flex justify-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
                <button
                  onClick={resetScoreFunction}
                  className=" bg-gray-700 text-white text-sm rounded-lg py-2.5 px-2.5 hover:bg-[#8739FA] focus:ring w-32 mt-10 mb-10"
                >
                  {HardcodedValues.reset}
                </button>
              </div>
              {questionAnswerList.map((event) => (
                <div
                  key={event.questionnaireId}
                  className="flex justify-center"
                >
                  <div className="flex justify-center mt-10 flex-col ">
                    <div className="text-2xl font-semibold break-words max-md:text-lg text-gray-900 mb-3  w-[50vw] max-md:w-[70vw] max-sm:w-[85vw]">
                      Q:{event.question}
                    </div>
                    <QuizAnswers
                      event={event}
                      answers={event}
                      answerData={answerData}
                      answerValues={answerValues}
                    />
                  </div>
                </div>
              ))}
              <div className="w-full flex justify-center">
                {!questionAnswerList.length == 0 && (
                  <button
                    onClick={submitAnswer}
                    className={
                      questionAnswerList.length - answerValues.length != 0
                        ? " bg-gray-700 text-white text-sm rounded-lg py-2.5 px-2.5 hover:bg-red-500 focus:ring w-32 mt-10 mb-10"
                        : " bg-blue-900 text-white text-sm rounded-lg py-2.5 px-2.5 hover:bg-blue-700 focus:ring w-32 mt-10 mb-10"
                    }
                  >
                    {HardcodedValues.submit}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizList;
