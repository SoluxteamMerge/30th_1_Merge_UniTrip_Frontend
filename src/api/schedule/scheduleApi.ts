// src/api/schedule/scheduleApi.ts
import api from "../api"; // 이미 axios 인스턴스가 설정된 파일
import { AxiosResponse } from "axios";

export interface CreateScheduleRequest {
  title: string;
  description: string;
  travelType: "국내" | "해외" | "기타";
  startDate: string;  // YYYY-MM-DD
  endDate: string;    // YYYY-MM-DD
  companions: string;
  isPublic: boolean;
}

export interface CreatedSchedule {
  scheduleId: number;
  title: string;
  description: string;
  travelType: string;
  startDate: string;
  endDate: string;
  companions: string;
  isPublic: boolean;
  createdAt: string;
}

export interface CreateScheduleResponse {
  code: number;
  message: string;
  data: CreatedSchedule;
}

export const createSchedule = async (
  scheduleData: CreateScheduleRequest,
  token: string
): Promise<CreateScheduleResponse> => {
  const response: AxiosResponse<CreateScheduleResponse> = await api.post(
    "/api/schedules",
    scheduleData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
