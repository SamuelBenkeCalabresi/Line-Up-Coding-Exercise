import axios from "axios";
import { User } from "../../models";

export interface UsersResponse {
  data: User[];
  total_pages: number;
}

export const getUsersByPage = async ({ page }: { page: number }) => {
  try {
    return await axios.get(`https://reqres.in/api/users?page=${page}`);
  } catch (err) {
    console.error(err);
  }
};
