export interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterUserResponse {
    id: string;
    name: string;
    email: string;
}

export interface LoginUserRequest {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    expiration: string;
}
