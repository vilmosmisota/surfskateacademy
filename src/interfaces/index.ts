export interface IClass {
  class_id: string;
  date: string;
  time: string;
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
    time: string;
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
    time: string;
    city: string;
  };
}

export interface IImage {
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export interface IHighlights {
  fields: {
    title: string;
    slug: string;
    introText: string;
    mainText: string;
    featuredImage: IImage;
    imagelists?: IImage[];
  };
}

export interface IHighlightsPost {
  title: string;
  slug: string;
  introText: string;
  mainText: string;
  featuredImage: IImage;
  imagelists?: IImage[];
}

export interface IShortBio {
  fields: {
    image: IImage;
    text: string;
    title: string;
  };
}

export interface ICallToAction {
  fields: {
    buttonLabel: string;
    buttonDestination: string;
    description: string;
    title: string;
  };
}

export interface IHeader {
  fields: {
    heading: string;
    title: string;
    image: IImage;
  };
}

export interface IContentsBlock {
  fields: {
    contentTitle: string;
    description: string;
    image: IImage;
  };
}

export interface IIntro {
  fields: {
    introText: string;
    buttonLabel: string;
    buttonDestination: string;
  };
}

export interface IHomeContent {
  callToAction: ICallToAction;
  carousel: IContentsBlock[];
  header: IHeader;
  intro: IIntro;
  highlights: IHighlights[];
  shortBio: IShortBio;
}
