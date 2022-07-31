export interface IClass {
  class_id: string;
  date: string;
  location: string;
  is_available: boolean;
  map_link?: string;
  city: string;
  info?: string;
}

export interface IBooking {
  booking_id?: string;
  class_id: string;
  fname: string;
  lname: string;
  email: string;
  phonenumber?: string;
  is_first_time?: boolean;
  is_equipment: boolean;
  level?: string;
  message?: string;
}
