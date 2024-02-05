import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();

  return <div>This is the student details page {studentId}</div>;
};

export default StudentDetails;
