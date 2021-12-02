export const SECRET = "babababababaBOBOBOBBbroorrororororoorrororororororororro"

export interface JWTPayload {
  id: number;
}
export interface ManageUserDto{
  firstName : string;
  lastName : string;
  role : string;
  email : string;
  password : string;
}