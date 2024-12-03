export interface Admin {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
}