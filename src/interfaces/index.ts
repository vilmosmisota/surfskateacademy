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
  created_at: string;
  booking_id?: string;
  class_id: string;
  fname: string;
  lname: string;
  email: string;
  is_read: boolean;
  phonenumber?: string;
  is_first_time?: boolean;
  is_equipment: boolean;
  level?: string;
  message?: string;
  class?: {
    date: string;
    city: string;
    location: string;
  };
}

export interface IAdminBookingItem {
  created_at: string;
  booking_id: string;
  email: string;
  is_read: boolean;
  class: {
    date: string;
    city: string;
  };
}
