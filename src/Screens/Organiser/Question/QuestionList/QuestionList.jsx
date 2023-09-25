import { useEffect, useState } from "react";
import {
  deleteQuestion,
  questionListApiForAdmin,
} from "../../../../API/ApiService/EventListApi/EventListApi";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { NavLink } from "react-router-dom";

const QuestionList = () => {
  const [questionAnswerList, setQuestionAnswerList] = useState([]);

  useEffect(() => {
    questionsFetchApiCall();
  }, []);

  const questionsFetchApiCall = () => {
    questionListApiForAdmin()
      .then((response) => {
        setQuestionAnswerList(response?.data);
      })
      .catch((error) => {});
  };

  const deleteQuestionfunction = async (questionId) => {
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
      try {
        await deleteQuestion(questionId);
        deleteOption(questionId);
        Swal.fire("Deleted Successfully");
      } catch (error) {
        GlobalToaster("delete unsuccessfull", 405, ["error"], 3000);
      }
    }
  };

  const deleteOption = (questionnaireIdToRemove) => {
    const updatedOptions = questionAnswerList.filter(
      (option) => option.questionnaireId !== questionnaireIdToRemove
    );

    setQuestionAnswerList(updatedOptions);
  };

  return (
    <div className="relative max-h-[91vh] overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Question
            </th>
            <th scope="col" className="px-6 py-3">
              answer
            </th>
            <th scope="col" className="px-6 py-3">
              Level
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        {questionAnswerList?.map((question) => (
          <tbody key={question?.questionnaireId}>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {question?.question}
              </th>
              <td className="px-6 py-4">
                {question?.answers[question?.realAnswer - 1]}
              </td>
              <td className="px-6 py-4">level {question.level + 1}</td>
              <td className="px-6 py-4">
                <NavLink
                  to={`/Organiser/EditQuestion?questionId=${question?.questionnaireId}`}
                  className="font-medium text-gray-700 hover:text-gray-400 "
                >
                  <DriveFileRenameOutlineIcon />
                </NavLink>
              </td>
              <td>
                <button
                  className="font-medium text-gray-700  "
                  onClick={() =>
                    deleteQuestionfunction(question?.questionnaireId)
                  }
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default QuestionList;
