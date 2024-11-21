export interface LoginResult {
    accessToken: string;
    expiresIn: number;
    userToken: {
        id: string;
        email: string;
        claims: Claims[];
    };
    refreshToken: string;
}

export interface Claims {
    value: string;
    type: string;
}
