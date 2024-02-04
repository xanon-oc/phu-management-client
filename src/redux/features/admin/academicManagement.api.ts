import { TQueryParam, TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        // params.append("name", args);
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    getAllAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        // params.append("name", args);
        return {
          url: "/academic-departments",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useGetAllAcademicDepartmentQuery,
  useAddAcademicSemesterMutation,
} = academicManagementApi;
