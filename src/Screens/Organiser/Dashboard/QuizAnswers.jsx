import { Answer } from "./Answer";

function QuizAnswers({ answerData,  event, answerValues }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 shadow-lg dark:shadow-dark rounded-2xl min-w-80 w-[50vw] max-md:w-[70vw] max-sm:w-[85vw]">
      <div className="pt-6 pb-2">
        {event?.answers.map((answer,index) => (
          <Answer
            key={answer}
            answers={answer}
            event={event}
            answerData={answerData}
            answerValues={answerValues}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizAnswers;
