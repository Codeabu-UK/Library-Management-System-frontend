import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios-instance";
import type { AxiosResponse } from "axios";
import type {
  AuthResponseModel,
  CreateUserModel,
  UserLoginModel,
} from "./authModel";

const login = (values: UserLoginModel) => {
  return axiosInstance.post("/auth/login", values);
};

const signup = (values: CreateUserModel) => {
  return axiosInstance.post("/auth/signup", values);
};

export const useLogin = (
  onSuccess?: (data: AxiosResponse<AuthResponseModel>) => void,
  onError?: (error: unknown) => void
) => {
  return useMutation<AxiosResponse<AuthResponseModel>, unknown, UserLoginModel>(
    {
      mutationFn: login,
      onSuccess,
      onError,
      mutationKey: ["login"],
    }
  );
};

export const useSignUp = (
  onSuccess?: (data: AxiosResponse<AuthResponseModel>) => void,
  onError?: (error: unknown) => void
) => {
  return useMutation<
    AxiosResponse<AuthResponseModel>,
    unknown,
    CreateUserModel
  >({
    mutationFn: signup,
    onSuccess,
    onError,
    mutationKey: ["signup"],
  });
};

export const useLogout = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  return useMutation<void, unknown>({
    mutationFn: async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("favorites");
      return;
    },
    onSuccess,
    onError,
    mutationKey: ["logout"],
  });
};
