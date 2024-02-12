/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicDepartment, TQueryParam } from "../../../types";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

export type TTableData = Pick<
  TAcademicDepartment,
  "_id" | "name" | "academicFaculty"
>;
const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: departmentData,
    isLoading,
    isFetching,
  } = useGetAcademicDepartmentsQuery(params);
  console.log({ isLoading, isFetching });
  const tableData =
    departmentData?.data?.map(({ _id, name, academicFaculty }, index) => ({
      key: _id || `row-${index}`,
      _id,
      academicFaculty,
      name,
    })) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      key: "name",
      title: "Faculty Name",
      dataIndex: "name",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      key: "academicFaculty",
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log({ filters, extra });
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };
  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <Table
      pagination={false}
      columns={columns}
      loading={isFetching}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicDepartment;
