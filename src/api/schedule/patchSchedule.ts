import api from '../api'; // 공통 axios 인스턴스

export interface PatchScheduleRequest {
  title?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  travelType?: '국내' | '해외' | '기타';
  companions?: string;
  isPublic?: boolean;
}

export interface PatchScheduleResponse {
  code: number;
  message: string;
  data: {
    scheduleId: number;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    travelType: string;
    companions: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export const patchSchedule = async (
  scheduleId: number,
  updateData: PatchScheduleRequest,
  token: string
): Promise<PatchScheduleResponse> => {
  const response = await api.patch(`/api/schedules/${scheduleId}`, updateData, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
