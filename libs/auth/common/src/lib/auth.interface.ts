export interface AuthCredentials {
  readonly email: string;
}

export interface AuthConfirm extends AuthCredentials {
  readonly code: string;
}

export interface AuthResponse {
  readonly accessToken: string;
  readonly uuid: string;
}

export interface AuthRegister {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
}
