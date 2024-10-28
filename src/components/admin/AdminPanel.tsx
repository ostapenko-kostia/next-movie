"use client";

import { IMovie, ITheater, Role, TCategory } from "@/interfaces/interfaces";
import adminService from "@/services/admin/admin.service";
import { useAuth } from "@/store/authStore";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AdminPanelProps {
  movies: IMovie[];
  theaters: ITheater[];
  categories: TCategory[];
}

function AdminPanel({ movies, theaters, categories }: AdminPanelProps) {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user!.role === Role.user) notFound();
  }, [user])

  return (
    <div className="container mx-auto max-sm:gap-3">
      <h2 className="text-3xl font-semibold text-center">Admin panel</h2>
      <h3 className="text-xl text-center mt-2 text-secondary">
        Welcome back, <b className="text-white">{user!.firstName}!</b>
      </h3>
      <div>
        <div className="flex flex-col items-center justify-center my-10">
          <h3 className="text-center font-bold text-1.5xl">Showtime Actions</h3>
          <ul>
            <li className="text-center w-80">
              <h4 className="font-bold my-2">Create a Showtime</h4>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit((data) => {
                  if (data.movie == -1 || data.theater == -1)
                    toast.error("Please select a movie and a theater");
                  else {
                    toast.promise(
                      adminService.createShowtime(
                        data.dateAndTime,
                        data.movie,
                        data.theater
                      ),
                      {
                        loading: "Creating showtime...",
                        success: "Showtime created!",
                        error: "Failed to create showtime",
                      }
                    );
                  }
                })}
              >
                <input
                  className="w-full input"
                  required
                  type="datetime-local"
                  {...register("dateAndTime")}
                />
                {movies && (
                  <select
                    className="w-full input"
                    required
                    {...register("movie")}
                  >
                    <option value={-1} hidden>
                      Select a movie
                    </option>
                    {movies.map((movie) => (
                      <option value={movie.movie_id} key={movie.movie_id}>
                        {movie.title}
                      </option>
                    ))}
                  </select>
                )}
                {theaters && (
                  <select
                    className="w-full input"
                    required
                    {...register("theater")}
                  >
                    <option value={-1} hidden>
                      Select a theater
                    </option>
                    {theaters.map((theater) => (
                      <option
                        value={theater.theater_id}
                        key={theater.theater_id}
                      >
                        {theater.name} - #{theater.theater_id}
                      </option>
                    ))}
                  </select>
                )}
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 mx-12 rounded-xl transition-transform duration-200 hover:scale-105"
                >
                  Create
                </button>
              </form>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center my-10">
          <h3 className="text-center font-bold text-1.5xl">Movie Actions</h3>
          <ul className="flex gap-4 flex-wrap justify-center">
            <li className="text-center w-80">
              <h4 className="font-bold my-2">Create a Movie</h4>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit((data) => {
                  if (data.create_category == -1)
                    toast.error("Please select a category");
                  else {
                    toast.promise(
                      adminService.createMovie(
                        data.create_file[0],
                        data.create_title,
                        data.create_director,
                        data.create_category,
                        data.create_description,
                        data.create_duration,
                        data.create_date,
                        data.create_trailer_url
                      ),
                      {
                        loading: "Creating movie...",
                        success: "Movie created!",
                        error: "Failed to create movie",
                      }
                    );
                  }
                })}
              >
                <input
                  className="w-full input"
                  required
                  type="file"
                  {...register("create_file")}
                  accept="image/*"
                />
                <input
                  className="w-full input"
                  required
                  type="text"
                  {...register("create_title")}
                  placeholder="Title"
                />
                <input
                  className="w-full input"
                  required
                  type="text"
                  {...register("create_director")}
                  placeholder="Director"
                />
                <select
                  className="w-full input"
                  required
                  {...register("create_category")}
                >
                  <option hidden value={-1}>
                    Select a Category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="w-full input"
                  required
                  {...register("create_duration")}
                  placeholder="Duration"
                />
                <input
                  className="w-full input"
                  required
                  type="date"
                  {...register("create_date")}
                  aria-label="Date of release"
                />
                <input
                  className="w-full input"
                  required
                  type="url"
                  {...register("create_trailer_url")}
                  placeholder="Trailer URL"
                />
                <textarea
                  className="w-full input min-h-32"
                  required
                  {...register("create_description")}
                  placeholder="Description"
                />
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 mx-12 rounded-xl transition-transform duration-200 hover:scale-105"
                >
                  Create
                </button>
              </form>
            </li>
            <li className="text-center w-80">
              <h4 className="font-bold my-2">Update a Movie</h4>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit((data) => {
                  if (data.movie_id == -1) toast.error("Please select a movie");
                  else {
                    const selectedMovie = movies.find(
                      (movie) => movie.movie_id == data.movie_id
                    );
                    toast.promise(
                      adminService.updateMovie(
                        data.movie_id,
                        data.upd_title ? data.upd_title : selectedMovie?.title,
                        data.upd_director
                          ? data.upd_director
                          : selectedMovie?.director,
                        data.upd_category && data.upd_category != -1
                          ? data.upd_category
                          : selectedMovie?.category,
                        data.upd_description
                          ? data.upd_description
                          : selectedMovie?.description,
                        data.upd_duration
                          ? data.upd_duration
                          : selectedMovie?.duration,
                        data.upd_date
                          ? data.upd_date
                          : selectedMovie?.release_date,
                        data.upd_trailer_url
                          ? data.upd_trailer_url
                          : selectedMovie?.trailer_url
                      ),
                      {
                        loading: "Updating movie...",
                        success: "Movie updated!",
                        error: "Failed to update movie",
                      }
                    );
                  }
                })}
              >
                <select
                  className="w-full input h-[58px]"
                  required
                  {...register("movie_id")}
                >
                  <option hidden value={-1}>
                    Select a Movie
                  </option>
                  {movies.map((movie) => (
                    <option key={movie.movie_id} value={movie.movie_id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
                <input
                  className="w-full input"
                  type="text"
                  {...register("upd_title")}
                  placeholder="Title"
                />
                <input
                  className="w-full input"
                  type="text"
                  {...register("upd_director")}
                  placeholder="Director"
                />
                <select className="w-full input" {...register("upd_category")}>
                  <option hidden value={-1}>
                    Select a Category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="w-full input"
                  {...register("upd_duration")}
                  placeholder="Duration"
                />
                <input
                  className="w-full input"
                  type="date"
                  {...register("upd_date")}
                  aria-label="Date of release"
                />
                <input
                  className="w-full input"
                  type="url"
                  {...register("upd_trailer_url")}
                  placeholder="Trailer URL"
                />
                <textarea
                  className="w-full input min-h-32"
                  {...register("upd_description")}
                  placeholder="Description"
                />
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 mx-12 rounded-xl transition-transform duration-200 hover:scale-105"
                >
                  Update
                </button>
              </form>
            </li>
            <li className="text-center w-80">
              <h4 className="font-bold my-2">Delete a Movie</h4>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit((data) => {
                  toast.promise(
                    adminService.deleteMovie(data.delete_movie_id),
                    {
                      loading: "Deleting movie...",
                      success: "Movie deleted!",
                      error: "Failed to delete movie",
                    }
                  );
                })}
              >
                <select
                  className="w-full input"
                  required
                  {...register("delete_movie_id")}
                >
                  <option hidden value={-1}>
                    Select a movie
                  </option>
                  {movies.map((movie) => (
                    <option key={movie.movie_id} value={movie.movie_id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 mx-12 rounded-xl transition-transform duration-200 hover:scale-105"
                >
                  Delete
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
