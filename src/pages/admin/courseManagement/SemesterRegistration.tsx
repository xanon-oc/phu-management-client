/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import BSForm from "../../../components/form/BSForm";
import BSSelect from "../../../components/form/BSSelect";
import BSDatePicker from "../../../components/form/BSDatePicker";
import BSInput from "../../../components/form/BSInput";
import { semesterStatusOptions } from "../../../constants/semester";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <BSForm onSubmit={onSubmit}>
          <BSSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <BSSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <BSDatePicker name="startDate" label="Start Date" />
          <BSDatePicker name="endDate" label="End Date" />
          <BSInput type="text" name="minCredit" label="Min Credit" />
          <BSInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </BSForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
