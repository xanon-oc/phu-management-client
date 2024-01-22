import { useGetAllSemestersQuery } from "../../../redux/features/academinSemester/academicSemesterSlice";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data);
  return <div>This is the academic-semesters</div>;
};

export default AcademicSemester;
