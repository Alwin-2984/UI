import { Answer } from "./Answer";

function QuizAnswers({ answerData, event, answerValues, options,deleteOption }) {
  return (
    <div className=" rounded-2xl min-w-80 w-[50vw] max-md:w-[70vw] max-sm:w-[85vw]">
      <div className="pt-6 pb-2">
        {options?.map((answer, index) => (
          <Answer
            key={answer}
            answers={answer}
            event={event}
            answerData={answerData}
            answerValues={answerValues}
            index={index}
            deleteOption={deleteOption}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizAnswers;
