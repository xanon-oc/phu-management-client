/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import BSForm from "../../../components/form/BSForm";
import BSInput from "../../../components/form/BSInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    // const name = { name: data };

    try {
      const res = (await addAcademicFaculty(data)) as TResponse;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <BSForm
          resolver={zodResolver(academicFacultySchema)}
          onSubmit={onSubmit}
        >
          <BSInput name="name" type="text" label="Faculty Name" />
          <Button htmlType="submit">Submit</Button>
        </BSForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
