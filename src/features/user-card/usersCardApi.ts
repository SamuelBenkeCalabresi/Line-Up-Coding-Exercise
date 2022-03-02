import axios from "axios";
import { User } from "../../models";

export interface UserResponse {
  data: User;
}

export const getUserById = async ({ userId }: { userId: string }) => {
  try {
    return await axios.get(`https://reqres.in/api/users/${userId}`);
  } catch (err) {
    console.error(err);
  }
};
