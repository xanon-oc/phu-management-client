import { Button, Col, Flex } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import BSForm from "../../../components/form/BSForm";
import BSSelectWithWatch from "../../../components/form/BSSelectWithWatch";
import BSInput from "../../../components/form/BSInput";

const OfferCourse = () => {
  const [id, setId] = useState("");

  console.log("Inside parent component", id);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <BSForm onSubmit={onSubmit}>
          <BSSelectWithWatch
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <BSInput disabled={!id} type="text" name="test" label="Test" />
          <Button htmlType="submit">Submit</Button>
        </BSForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
