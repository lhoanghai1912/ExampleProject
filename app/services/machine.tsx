// services/apiServices/mayMocService.ts
import { HttpClient } from './index';

export const getDanhSachMayMoc = async (sessionId: string, routeId: string) => {
  try {
    const data = await HttpClient.get('/U_MAYMOCTHIETBI', sessionId, routeId);
    return data;
  } catch (error) {
    console.error('❌ Lỗi khi gọi API máy móc:', error);
    throw error;
  }
};
