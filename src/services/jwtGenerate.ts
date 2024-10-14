import jwt from "jsonwebtoken";
interface JWT {
    generateToken (userId : any, role:string):string;
}

class JwtToken implements JWT {
  generateToken(userId?: any, role?: string): string {
    const SECRETKEY ="secret123";
    if (SECRETKEY) {
      const token = jwt.sign({ userId, role }, SECRETKEY, {
        expiresIn: "30d",
      });
      return token;
    }
    throw new Error("jwt key is not defined");
  }
}

export default JwtToken;