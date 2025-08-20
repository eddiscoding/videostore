export type Token = {
  type: string;
  token: string;
  expiresAt: string;
};

export type TokenResponse = {
  token: Token;
};
