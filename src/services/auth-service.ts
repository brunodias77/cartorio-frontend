import api from './api';
import type { LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse } from '../types/auth';
import type { ApiResponse } from '../types/api-response';

const STORAGE_KEYS = {
    TOKEN: 'token',
    USER_NAME: 'userName',
    USER_ID: 'userId',
    TOKEN_EXPIRATION: 'tokenExpiration',
} as const;

export const AuthService = {
    login: async (data: LoginUserRequest): Promise<LoginUserResponse> => {
        const response = await api.post<ApiResponse<LoginUserResponse>>('/Auth/login', data);
        const apiResponse = response.data;

        if (apiResponse.success && apiResponse.data?.accessToken) {
            const { accessToken, name, id, expiration } = apiResponse.data;

            localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
            localStorage.setItem(STORAGE_KEYS.USER_NAME, name);
            localStorage.setItem(STORAGE_KEYS.USER_ID, id);
            localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRATION, expiration);

            return apiResponse.data;
        }

        throw new Error(apiResponse.message || 'Falha no login');
    },

    register: async (data: RegisterUserRequest): Promise<RegisterUserResponse> => {
        const response = await api.post<ApiResponse<RegisterUserResponse>>('/Auth/register', data);
        const apiResponse = response.data;

        if (apiResponse.success && apiResponse.data) {
            return apiResponse.data;
        }

        throw new Error(apiResponse.message || 'Falha no registro');
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_NAME);
        localStorage.removeItem(STORAGE_KEYS.USER_ID);
        localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRATION);
    },

    isAuthenticated: (): boolean => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const expiration = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRATION);

        if (!token || !expiration) return false;

        // Verifica se o token ainda é válido
        const expirationDate = new Date(expiration);
        return expirationDate > new Date();
    },

    getUserName: (): string | null => {
        return localStorage.getItem(STORAGE_KEYS.USER_NAME);
    },

    getUserId: (): string | null => {
        return localStorage.getItem(STORAGE_KEYS.USER_ID);
    },

    getToken: (): string | null => {
        return localStorage.getItem(STORAGE_KEYS.TOKEN);
    },
};
