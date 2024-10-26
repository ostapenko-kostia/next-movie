export type TCategory =
  | "Comedy"
  | "Romance"
  | "Science Fiction"
  | "Animation"
  | "Historical"
  | "Action"
  | "Horror"
  | "Western"
  | "Crime"
  | "Mystery"
  | "Drama"
  | "Thriller"
  | "Adventure"
  | "Musical"
  | "Documentary";

export interface IMovie {
  movie_id: number;
  title: string;
  description: string;
  duration: number;
  release_date: string;
  category: TCategory;
  poster_url: string;
  trailer_url: string;
  movie_status: string;
  director: string;
}

export interface ITheater {
  theater_id: number;
  name: string;
  capacity: number;
  screen_type: string;
  lower_boundary_seat_id: number;
  upper_boundary_seat_id: number;
}

export interface IShowtime {
  showtime_id: number;
  movie_id: number;
  theater_id: number;
  starting_date: string;
  ending_date: string;
  price: number;
  available_seats: number;
  price_per_seat: number;
}

export interface ISeat {
  seat_id: number;
  row_num: number;
  seat_num: number;
  availability: boolean;
}

export interface SeatResponse {
  theater_id: number;
  movie_id: number;
  showtime_id: number;
  all_seats_per_showtime: ISeat[];
}

export interface IUser {
  firstName: string;
  lastName: string;
  id: number;
  email: string;
  role: Role;
}

export enum Token {
  refreshToken = "refreshToken",
  accessToken = "accessToken",
}

export enum Storage {
  user = "user",
}

export enum Role {
  admin = "ROLE_ADMIN",
  user = "ROLE_USER",
}

export enum ApiRoutes {
  getMovies = "/movie/all",
  getAllTheaters = "/theaters/all",
  getFutureShowtimes = "/showtime/future",
  getAllSeats = "/seats/all",
  getOrders = "/user/orders/",
  register = "/api/auth/register",
  login = "/api/auth/authenticate",
  googleLogin = "/api/auth/google",
  refresh = "/api/auth/refreshtoken",
  createCheckoutSession = "/api/create-checkout-session",
  createShowtime = "/showtime/create",
  createMovie = "/movie/create",
  updateMovie = "/movie/update",
  deleteMovie = "/movie/delete",
  editEmail = "/user/change-email",
}

export interface IAuthResponse {
  access_token: Token.accessToken;
  refresh_token: Token.refreshToken;
  user_details: IUser;
}
