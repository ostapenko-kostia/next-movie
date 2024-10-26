import instance from "@/api/api.interceptor";
import { ApiRoutes } from "@/interfaces/interfaces";

const userService = {
  async editEmail(email: string) {
    return (await instance.post<string, { data: void }>(ApiRoutes.editEmail, { new_email: email })).data;
  },
  async getOrders() {
    return (await instance.get<string, { data: { showtime_id: number; listOfSeats_id: number[]; buyer_email: string; final_cost: number }[] }>(ApiRoutes.getOrders)).data;
  },
};

export default userService;
