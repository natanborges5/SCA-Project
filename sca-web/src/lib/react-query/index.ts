import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { useQuery, useMutation, useQueryClient, type QueryClient, type UseMutationOptions, type UseQueryOptions, type MutationFunction, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
export type SubjectRequestDto = {
    name?: string;
    description?: string;
    workload?: number;
    creditNumber?: number;
};
export type Address = {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
};
export type LocalTime = {
    hour?: number;
    minute?: number;
    second?: number;
    nano?: number;
};
export type Professor = {
    id?: number;
    name?: string;
    registration?: string;
    phone?: string;
    email?: string;
    curriculum?: string;
    title?: "PROFESSOR" | "ASSOCIATE_PROFESSOR" | "ASSISTANT_PROFESSOR" | "INSTRUCTOR" | "LECTURER";
    contractType?: "FULL_TIME" | "PART_TIME" | "VISITING" | "ADJUNCT";
    studyClasses?: StudyClass[];
    address?: Address;
};
export type Student = {
    id?: number;
    name?: string;
    registration?: string;
    phone?: string;
    email?: string;
    gpt?: string;
    address?: Address;
    studyClasses?: StudyClass[];
};
export type StudyClass = {
    id?: number;
    code?: string;
    name?: string;
    classroom?: string;
    description?: string;
    startTime?: string;
    subject?: Subject;
    professor?: Professor;
    students?: Student[];
};
export type Subject = {
    id?: number;
    name?: string;
    description?: string;
    workload?: number;
    creditNumber?: number;
    studyClasses?: StudyClass[];
};
export type StudyClassRequestDto = {
    code?: string;
    name?: string;
    classroom?: string;
    description?: string;
    startTime?: string;
    professorId?: number;
    subjectId?: number;
    studentsIds?: number[];
};
export type ProfessorRequestDto = {
    name?: string;
    registration?: string;
    phone?: string;
    email?: string;
    curriculum?: string;
    title?: "PROFESSOR" | "ASSOCIATE_PROFESSOR" | "ASSISTANT_PROFESSOR" | "INSTRUCTOR" | "LECTURER";
    contractType?: "FULL_TIME" | "PART_TIME" | "VISITING" | "ADJUNCT";
    address?: Address;
};
export type StudentRequestDto = {
    name?: string;
    registration?: string;
    phone?: string;
    email?: string;
    gpt?: string;
    address?: Address;
};
export type StudyClassDto = {
    id?: number;
    code?: string;
    name?: string;
    classroom?: string;
    description?: string;
    startTime?: string;
};
export type SubjectResponseDto = {
    id?: number;
    name?: string;
    description?: string;
    workload?: number;
    creditNumber?: number;
    studyClasses?: StudyClassDto[];
};
export type StudentDto = {
    id?: number;
    name?: string;
    registration?: string;
    phone?: string;
    email?: string;
    gpt?: string;
    address?: Address;
};
export type StudentResponseDto = {
    id?: number;
    name?: string;
    registration?: string;
    phone?: string;
    email?: string;
    gpt?: string;
    address?: Address;
    studyClasses?: StudyClassDto[];
};
export type ProfessorDto = {
    id?: number;
    name?: string;
    registration?: string;
    phone?: string;
    email?: string;
    curriculum?: string;
    title?: "PROFESSOR" | "ASSOCIATE_PROFESSOR" | "ASSISTANT_PROFESSOR" | "INSTRUCTOR" | "LECTURER";
    contractType?: "FULL_TIME" | "PART_TIME" | "VISITING" | "ADJUNCT";
    address?: Address;
};
export type ProfessorResponseDto = {
    id?: number;
    name?: string;
    registration?: string;
    phone?: string;
    email?: string;
    curriculum?: string;
    title?: "PROFESSOR" | "ASSOCIATE_PROFESSOR" | "ASSISTANT_PROFESSOR" | "INSTRUCTOR" | "LECTURER";
    contractType?: "FULL_TIME" | "PART_TIME" | "VISITING" | "ADJUNCT";
    address?: Address;
    studyClasses?: StudyClassDto[];
};
export type AxiosConfig = {
    paramsSerializer?: AxiosRequestConfig["paramsSerializer"];
};
export type Config = {
    mutations?: MutationConfigs;
    axios?: AxiosConfig;
};
export function initialize(axios: AxiosInstance, config?: Config) {
    const requests = makeRequests(axios, config?.axios);
    return {
        requests,
        queries: makeQueries(requests),
        mutations: makeMutations(requests, config?.mutations)
    };
}
function useRapiniMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationFn: MutationFunction<TData, TVariables>, config?: (queryClient: QueryClient) => Pick<UseMutationOptions<TData, TError, TVariables, TContext>, "onSuccess" | "onSettled" | "onError">, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">): UseMutationResult<TData, TError, TVariables, TContext> {
    const { onSuccess, onError, onSettled, ...rest } = options ?? {};
    const queryClient = useQueryClient();
    const conf = config?.(queryClient);
    const mutationOptions: typeof options = {
        onSuccess: (data: TData, variables: TVariables, context?: TContext) => {
            conf?.onSuccess?.(data, variables, context);
            onSuccess?.(data, variables, context);
        },
        onError: (error: TError, variables: TVariables, context?: TContext) => {
            conf?.onError?.(error, variables, context);
            onError?.(error, variables, context);
        },
        onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, context?: TContext) => {
            conf?.onSettled?.(data, error, variables, context);
            onSettled?.(data, error, variables, context);
        },
        ...rest
    };
    return useMutation({ mutationFn, ...mutationOptions });
}
function nullIfUndefined<T>(value: T): NonNullable<T> | null {
    return typeof value === "undefined" ? null : value as NonNullable<T> | null;
}
export const queryKeys = {
    getSubjectById: (id: number) => ["getSubjectById", id] as const,
    getStudyClassById: (id: number) => ["getStudyClassById", id] as const,
    getStudentById: (id: number) => ["getStudentById", id] as const,
    getProfessorById: (id: number) => ["getProfessorById", id] as const,
    fetchSubjectList: () => ["fetchSubjectList"] as const,
    fetchStudyClassList: () => ["fetchStudyClassList"] as const,
    fetchStudentList: () => ["fetchStudentList"] as const,
    fetchProfessorList: () => ["fetchProfessorList"] as const
} as const;
export type QueryKeys = typeof queryKeys;
function makeRequests(axios: AxiosInstance, config?: AxiosConfig) {
    return {
        getSubjectById: (id: number) => axios.request<SubjectResponseDto>({
            method: "get",
            url: `/subject/${id}`
        }).then(res => res.data),
        deleteSubjectById: (id: number) => axios.request<string>({
            method: "delete",
            url: `/subject/${id}`
        }).then(res => res.data),
        updateSubject: (payload: SubjectRequestDto, id: number) => axios.request<Subject>({
            method: "put",
            url: `/subject/${id}`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data),
        getStudyClassById: (id: number) => axios.request<StudyClass>({
            method: "get",
            url: `/studyClass/${id}`
        }).then(res => res.data),
        deleteStudyClassById: (id: number) => axios.request<string>({
            method: "delete",
            url: `/studyClass/${id}`
        }).then(res => res.data),
        updateStudyClass: (payload: StudyClassRequestDto, id: number) => axios.request<{}>({
            method: "put",
            url: `/studyClass/${id}`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data),
        getStudentById: (id: number) => axios.request<StudentResponseDto>({
            method: "get",
            url: `/student/${id}`
        }).then(res => res.data),
        deleteStudentById: (id: number) => axios.request<string>({
            method: "delete",
            url: `/student/${id}`
        }).then(res => res.data),
        updateStudent: (payload: Student, id: number) => axios.request<Student>({
            method: "put",
            url: `/student/${id}`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data),
        getProfessorById: (id: number) => axios.request<ProfessorResponseDto>({
            method: "get",
            url: `/professor/${id}`
        }).then(res => res.data),
        deleteProfessorById: (id: number) => axios.request<string>({
            method: "delete",
            url: `/professor/${id}`
        }).then(res => res.data),
        updateProfessor: (payload: ProfessorRequestDto, id: number) => axios.request<Professor>({
            method: "put",
            url: `/professor/${id}`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data),
        fetchSubjectList: () => axios.request<Subject[]>({
            method: "get",
            url: `/subject`
        }).then(res => res.data),
        saveSubject: (payload: SubjectRequestDto) => axios.request<Subject>({
            method: "post",
            url: `/subject`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data),
        fetchStudyClassList: () => axios.request<StudyClass[]>({
            method: "get",
            url: `/studyClass`
        }).then(res => res.data),
        saveStudyClass: (payload: StudyClassRequestDto) => axios.request<StudyClass>({
            method: "post",
            url: `/studyClass`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data),
        fetchStudentList: () => axios.request<StudentDto[]>({
            method: "get",
            url: `/student`
        }).then(res => res.data),
        saveStudent: (payload: StudentRequestDto) => axios.request<Student>({
            method: "post",
            url: `/student`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data),
        fetchProfessorList: () => axios.request<ProfessorDto[]>({
            method: "get",
            url: `/professor`
        }).then(res => res.data),
        saveProfessor: (payload: ProfessorRequestDto) => axios.request<Professor>({
            method: "post",
            url: `/professor`,
            data: payload,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.data)
    } as const;
}
export type Requests = ReturnType<typeof makeRequests>;
export type Response<T extends keyof Requests> = Awaited<ReturnType<Requests[T]>>;
function makeQueries(requests: Requests) {
    return {
        useGetSubjectById: (id: number, options?: Omit<UseQueryOptions<Response<"getSubjectById">, unknown, Response<"getSubjectById">, ReturnType<QueryKeys["getSubjectById"]>>, "queryKey" | "queryFn">): UseQueryResult<Response<"getSubjectById">, unknown> => useQuery({ queryKey: queryKeys.getSubjectById(id), queryFn: () => requests.getSubjectById(id), ...options }),
        useGetStudyClassById: (id: number, options?: Omit<UseQueryOptions<Response<"getStudyClassById">, unknown, Response<"getStudyClassById">, ReturnType<QueryKeys["getStudyClassById"]>>, "queryKey" | "queryFn">): UseQueryResult<Response<"getStudyClassById">, unknown> => useQuery({ queryKey: queryKeys.getStudyClassById(id), queryFn: () => requests.getStudyClassById(id), ...options }),
        useGetStudentById: (id: number, options?: Omit<UseQueryOptions<Response<"getStudentById">, unknown, Response<"getStudentById">, ReturnType<QueryKeys["getStudentById"]>>, "queryKey" | "queryFn">): UseQueryResult<Response<"getStudentById">, unknown> => useQuery({ queryKey: queryKeys.getStudentById(id), queryFn: () => requests.getStudentById(id), ...options }),
        useGetProfessorById: (id: number, options?: Omit<UseQueryOptions<Response<"getProfessorById">, unknown, Response<"getProfessorById">, ReturnType<QueryKeys["getProfessorById"]>>, "queryKey" | "queryFn">): UseQueryResult<Response<"getProfessorById">, unknown> => useQuery({ queryKey: queryKeys.getProfessorById(id), queryFn: () => requests.getProfessorById(id), ...options }),
        useFetchSubjectList: (options?: Omit<UseQueryOptions<Response<"fetchSubjectList">, unknown, Response<"fetchSubjectList">, ReturnType<QueryKeys["fetchSubjectList"]>>, "queryKey" | "queryFn">): UseQueryResult<Response<"fetchSubjectList">, unknown> => useQuery({ queryKey: queryKeys.fetchSubjectList(), queryFn: () => requests.fetchSubjectList(), ...options }),
        useFetchStudyClassList: (options?: Omit<UseQueryOptions<Response<"fetchStudyClassList">, unknown, Response<"fetchStudyClassList">, ReturnType<QueryKeys["fetchStudyClassList"]>>, "queryKey" | "queryFn">): UseQueryResult<Response<"fetchStudyClassList">, unknown> => useQuery({ queryKey: queryKeys.fetchStudyClassList(), queryFn: () => requests.fetchStudyClassList(), ...options }),
        useFetchStudentList: (options?: Omit<UseQueryOptions<Response<"fetchStudentList">, unknown, Response<"fetchStudentList">, ReturnType<QueryKeys["fetchStudentList"]>>, "queryKey" | "queryFn">): UseQueryResult<Response<"fetchStudentList">, unknown> => useQuery({ queryKey: queryKeys.fetchStudentList(), queryFn: () => requests.fetchStudentList(), ...options }),
        useFetchProfessorList: (options?: Omit<UseQueryOptions<Response<"fetchProfessorList">, unknown, Response<"fetchProfessorList">, ReturnType<QueryKeys["fetchProfessorList"]>>, "queryKey" | "queryFn">): UseQueryResult<Response<"fetchProfessorList">, unknown> => useQuery({ queryKey: queryKeys.fetchProfessorList(), queryFn: () => requests.fetchProfessorList(), ...options })
    } as const;
}
type MutationConfigs = {
    useUpdateSubject?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"updateSubject">, unknown, Parameters<Requests["updateSubject"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
    useDeleteSubjectById?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"deleteSubjectById">, unknown, unknown, unknown>, "onSuccess" | "onSettled" | "onError">;
    useUpdateStudyClass?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"updateStudyClass">, unknown, Parameters<Requests["updateStudyClass"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
    useDeleteStudyClassById?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"deleteStudyClassById">, unknown, unknown, unknown>, "onSuccess" | "onSettled" | "onError">;
    useUpdateStudent?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"updateStudent">, unknown, Parameters<Requests["updateStudent"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
    useDeleteStudentById?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"deleteStudentById">, unknown, unknown, unknown>, "onSuccess" | "onSettled" | "onError">;
    useUpdateProfessor?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"updateProfessor">, unknown, Parameters<Requests["updateProfessor"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
    useDeleteProfessorById?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"deleteProfessorById">, unknown, unknown, unknown>, "onSuccess" | "onSettled" | "onError">;
    useSaveSubject?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"saveSubject">, unknown, Parameters<Requests["saveSubject"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
    useSaveStudyClass?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"saveStudyClass">, unknown, Parameters<Requests["saveStudyClass"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
    useSaveStudent?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"saveStudent">, unknown, Parameters<Requests["saveStudent"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
    useSaveProfessor?: (queryClient: QueryClient) => Pick<UseMutationOptions<Response<"saveProfessor">, unknown, Parameters<Requests["saveProfessor"]>[0], unknown>, "onSuccess" | "onSettled" | "onError">;
};
function makeMutations(requests: Requests, config?: Config["mutations"]) {
    return {
        useUpdateSubject: (id: number, options?: Omit<UseMutationOptions<Response<"updateSubject">, unknown, Parameters<Requests["updateSubject"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"updateSubject">, unknown, Parameters<Requests["updateSubject"]>[0]>(payload => requests.updateSubject(payload, id), config?.useUpdateSubject, options),
        useDeleteSubjectById: (id: number, options?: Omit<UseMutationOptions<Response<"deleteSubjectById">, unknown, unknown, unknown>, "mutationFn">) => useRapiniMutation<Response<"deleteSubjectById">, unknown, unknown>(() => requests.deleteSubjectById(id), config?.useDeleteSubjectById, options),
        useUpdateStudyClass: (id: number, options?: Omit<UseMutationOptions<Response<"updateStudyClass">, unknown, Parameters<Requests["updateStudyClass"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"updateStudyClass">, unknown, Parameters<Requests["updateStudyClass"]>[0]>(payload => requests.updateStudyClass(payload, id), config?.useUpdateStudyClass, options),
        useDeleteStudyClassById: (id: number, options?: Omit<UseMutationOptions<Response<"deleteStudyClassById">, unknown, unknown, unknown>, "mutationFn">) => useRapiniMutation<Response<"deleteStudyClassById">, unknown, unknown>(() => requests.deleteStudyClassById(id), config?.useDeleteStudyClassById, options),
        useUpdateStudent: (id: number, options?: Omit<UseMutationOptions<Response<"updateStudent">, unknown, Parameters<Requests["updateStudent"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"updateStudent">, unknown, Parameters<Requests["updateStudent"]>[0]>(payload => requests.updateStudent(payload, id), config?.useUpdateStudent, options),
        useDeleteStudentById: (id: number, options?: Omit<UseMutationOptions<Response<"deleteStudentById">, unknown, unknown, unknown>, "mutationFn">) => useRapiniMutation<Response<"deleteStudentById">, unknown, unknown>(() => requests.deleteStudentById(id), config?.useDeleteStudentById, options),
        useUpdateProfessor: (id: number, options?: Omit<UseMutationOptions<Response<"updateProfessor">, unknown, Parameters<Requests["updateProfessor"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"updateProfessor">, unknown, Parameters<Requests["updateProfessor"]>[0]>(payload => requests.updateProfessor(payload, id), config?.useUpdateProfessor, options),
        useDeleteProfessorById: (id: number, options?: Omit<UseMutationOptions<Response<"deleteProfessorById">, unknown, unknown, unknown>, "mutationFn">) => useRapiniMutation<Response<"deleteProfessorById">, unknown, unknown>(() => requests.deleteProfessorById(id), config?.useDeleteProfessorById, options),
        useSaveSubject: (options?: Omit<UseMutationOptions<Response<"saveSubject">, unknown, Parameters<Requests["saveSubject"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"saveSubject">, unknown, Parameters<Requests["saveSubject"]>[0]>(payload => requests.saveSubject(payload), config?.useSaveSubject, options),
        useSaveStudyClass: (options?: Omit<UseMutationOptions<Response<"saveStudyClass">, unknown, Parameters<Requests["saveStudyClass"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"saveStudyClass">, unknown, Parameters<Requests["saveStudyClass"]>[0]>(payload => requests.saveStudyClass(payload), config?.useSaveStudyClass, options),
        useSaveStudent: (options?: Omit<UseMutationOptions<Response<"saveStudent">, unknown, Parameters<Requests["saveStudent"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"saveStudent">, unknown, Parameters<Requests["saveStudent"]>[0]>(payload => requests.saveStudent(payload), config?.useSaveStudent, options),
        useSaveProfessor: (options?: Omit<UseMutationOptions<Response<"saveProfessor">, unknown, Parameters<Requests["saveProfessor"]>[0], unknown>, "mutationFn">) => useRapiniMutation<Response<"saveProfessor">, unknown, Parameters<Requests["saveProfessor"]>[0]>(payload => requests.saveProfessor(payload), config?.useSaveProfessor, options)
    } as const;
}
