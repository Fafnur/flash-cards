export interface AuthCredentials {
  readonly email: string;
}

export interface AuthConfirm {
  readonly email: string;
  readonly code: string;
}

export interface AuthResponse {
  readonly accessToken: string;
  readonly uuid: string;
}

export interface AuthJwt {
  readonly uuid: string;
}
