// service/apiServices/sapAuthService.ts
import { HttpClient } from '../index';

interface LoginRequest {
  CompanyDB: string;
  UserName: string;
  Password: string;
}

export const login = async (payload: LoginRequest): Promise<any> => {
  try {
    const result = await HttpClient.post('/Login', payload);
    console.log('✅ Login result:', result);
    return result;
  } catch (error) {
    throw error;
  }
};
