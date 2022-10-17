//add user_id to request
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        cpf: string;
      };
    }
  }
}

export {};
