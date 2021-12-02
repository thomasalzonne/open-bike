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

export interface ManageStationDto{
  name : string;
  capacity : number;
  lon : number;
  lat : number;
}