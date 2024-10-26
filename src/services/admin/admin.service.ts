import instance from "@/api/api.interceptor";
import { ApiRoutes, TCategory } from "@/interfaces/interfaces";

const adminService = {
  async createShowtime(dateAndTime: string, movie_id: number, theater_id: number) {
    return (await instance.post(ApiRoutes.createShowtime, { start: dateAndTime, movie_id, theater_id })).data;
  },
  async createMovie(file: File, title: string, director: string, category: TCategory, description: string, duration: number, release_date: string, trailer_url: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("movie_data", JSON.stringify({ title, director, category, description, duration, release_date, trailer_url }));
    return (
      await instance.post(ApiRoutes.createMovie, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  },
  async updateMovie(movie_id: number, title?: string, director?: string, category?: TCategory, description?: string, duration?: number, release_date?: string, trailer_url?: string) {
    return (await instance.put(`${ApiRoutes.updateMovie}/${movie_id}`, { title, director, category, description, duration, release_date, trailer_url })).data;
  },
  async deleteMovie(movie_id: number) {
    return (await instance.delete(`${ApiRoutes.deleteMovie}/${movie_id}`)).data;
  },
};

export default adminService;
