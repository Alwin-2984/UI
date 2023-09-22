import { useEffect, useState } from "react";
import {
  answersSubmitApi,
  currentScoreApi,
  questionListApi,
  resetScoreApi,
} from "../../../API/ApiService/EventListApi/EventListApi";
import QuizAnswers from "./QuizAnswers";
import { ToasterWithLoading } from "../../Components/Toasters/ToasterWithLoading";
import GlobalToaster from "../../Components/Toasters/GlobalToaster";
import HardcodedValues from "./HardcodedValues";
import Swal from "sweetalert2";

const UserDashboard = () => {
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
        setIsLoading(false);
      });

    currentScoreApi()
      .then((response) => {
        setScore(response?.data);
      })
      .catch((error) => {});
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

  const submitAnswer = () => {
    if (questionCount == 0) {
      const apiPromise = new Promise((resolve, reject) => {
        answersSubmitApi(answerValues)
          .then((response) => {
            resolve(response);
            setScore(undefined);
            setEventValues([]);
            questionsFetchApiCall();
            goToTop();
            if (response?.data.message === "success") {
              ToasterWithLoading(apiPromise, "loading", "submitted");
              return;
            }
            if (response?.data.message === "passed") {
              ToasterWithLoading(
                apiPromise,
                "loading",
                "You've reached the highest level. Continue with high-level questions"
              );
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    } else {
      GlobalToaster("answer all questions", 405, ["error"], 3000);
    }
  };

  const resetScoreFunction = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        resetScoreApi()
          .then((response) => {
            Swal.fire(
              "Reset Successfully",
              "Your proggress has been deleted.",
              "success"
            );
            setScore(undefined);
            questionsFetchApiCall();
            resolve(response);
          })
          .catch(() => {});
      }
    });
  };

  return (
    <div className="relative">
      <div id="topOfPage" className="w-screen h-[90vh] overflow-y-scroll">
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
              <div className="md:absolute md:top-3 md:left-3 max-md:w-full max-md:flex max-md:justify-center text-lg font-semibold break-words max-md:text-base text-gray-900">
                {questionCount} Questions remaining
              </div>
              {score && (
                <div className="md:absolute md:top-10 md:left-3 max-md:w-full max-md:flex max-md:justify-center text-[1.7rem] font-semibold break-words max-md:text-lg text-gray-900">
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
                  <div className="flex justify-center mt-10 flex-col">
                    <div className="text-2xl font-semibold break-words max-md:text-lg text-gray-900 mb-3">
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

export default UserDashboard;
