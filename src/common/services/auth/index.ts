import { useMutation } from "@tanstack/react-query";
import { instance } from "../instances";

// TODO: status code 상수화
export type CheckNicknameResponse = {
  status?: string;
  code?: string;
  message: string;
};

export const checkNickname = async (
  nickname: string
): Promise<CheckNicknameResponse> => {
  const response = await instance.get(`/user/checkNickname`, {
    params: { nickname },
  });
  return response.data;
};

export const useCheckNicknameMuation = () => {
  return useMutation({
    mutationFn: checkNickname,
  });
};

// TODO: status code 상수화
export type CheckEmailResponse = {
  status?: string;
  code?: string;
  message: string;
};

export const checkEmail = async (
  email: string
): Promise<CheckEmailResponse> => {
  const response = await instance.get(`/user/checkEmail`, {
    params: { email },
  });
  return response.data;
};

export const useCheckEmailMuation = () => {
  return useMutation({
    mutationFn: checkEmail,
  });
};

export type SignUpRequest = {
  email: string;
  nickname: string;
  password: string;
  userRoleCode?: string;
  profileImage?: string;
};

export type SignUpResponse = {
  status?: string;
  code?: string;
  message: string;
  email: string;
};

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await instance.post(`/local/signup`, data);
  return response.data;
};

export const useSignUpMuation = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export type EmailSignInRequest = {
  email: string;
  password: string;
};

export type EmailSignInResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
};

export const signIn = async (
  data: EmailSignInRequest
): Promise<EmailSignInResponse> => {
  const response = await instance.post(`/local/login`, data);
  return response.data;
};

export const useEmailSignInMuation = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export const sendVerificationCode = async (email: string): Promise<void> => {
  const response = await instance.get(`/user/sendVerificationCode`, {
    params: { email },
  });
  return response.data;
};

export const useSendVerificationCodeMuation = () => {
  return useMutation({
    mutationFn: sendVerificationCode,
  });
};

export const checkVerificationCode = async ({
  email,
  verificationCode,
}: {
  email: string;
  verificationCode: string;
}): Promise<void> => {
  const response = await instance.get(`/user/checkVerificationCode`, {
    params: { email, verificationCode },
  });
  return response.data;
};

export const useCheckVerificationCodeMuation = () => {
  return useMutation({
    mutationFn: checkVerificationCode,
  });
};

export const resetPassword = async ({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}): Promise<void> => {
  const response = await instance.patch(`/user/password?email=${email}`, {
    newPassword1: newPassword,
    newPassword2: newPassword,
  });
  return response.data;
};

export const useResetPasswordMuation = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
