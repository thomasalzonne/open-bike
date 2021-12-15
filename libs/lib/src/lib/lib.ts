export const SECRET = "babababababaBOBOBOBBbroorrororororoorrororororororororro"

export interface JWTPayload {
  id: number;
}
export interface ManageUserDto{
  id : number; 
  firstName : string;
  lastName : string;
  role : string;
  email : string;
  password : string;
}

export interface ManageStationDto{
  id : number; 
  name : string;
  capacity : number;
  park?: ManageParkDto;
  lon : number;
  lat : number;
}

export interface ManageParkDto{
  id : number; 
  name : string;
  city : string;
  bikes : ManageBikeDto[];
  stations? : ManageStationDto[];
}

export interface ManageBikeDto{
  id : number; 
  station? : ManageStationDto;
}