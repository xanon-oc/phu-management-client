/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import BSForm from "../../../components/form/BSForm";
import BSInput from "../../../components/form/BSInput";
import { zodResolver } from "@hookform/resolvers/zod";
import BSSelect from "../../../components/form/BSSelect";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicDepartment = () => {
  const { data: academicFaculties, isFetching } =
    useGetAcademicFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  console.log(academicFaculties);

  const academicFacultiesOptions = academicFaculties?.data?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    // const name = { name: data };

    try {
      const res = (await addAcademicDepartment(data)) as TResponse;
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
          resolver={zodResolver(academicDepartmentSchema)}
          onSubmit={onSubmit}
        >
          <BSInput name="name" type="text" label="Department Name" />
          <BSSelect
            name="academicFaculty"
            options={academicFacultiesOptions}
            disabled={isFetching}
            label="Academic Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </BSForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
