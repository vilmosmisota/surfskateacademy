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
    previewImage: IImage;
    imagelists?: IImage[];
    featuredImage?: IImage;
    isFeatured?: boolean;
  };
  sys: {
    createdAt: string;
  };
}

export interface IHighlightsPost {
  title: string;
  slug: string;
  introText: string;
  mainText: string;
  previewImage: IImage;
  imagelists: IImage[];
  isFeatured?: boolean;
  featuredImage?: IImage;
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

export interface IAboutContent {
  header: IHeader;
  intro: IIntro;
  introContentBlock: string;
  image1: IImage;
  mainContentBlock: string;
  image2: IImage;
  outroContentBlock: string;
  image3: IImage;
}

export interface IClassesContent {
  header: IHeader;
  intro: IIntro;
  introContent: string;
  contentBlock: IContentsBlock[];
  cta: ICallToAction;
}

export interface IBookingLandingContentRaw {
  heading: string;
  image: IImage;
  quotes: {
    fields: {
      content: string;
    };
  }[];
}
export interface IBookingLandingContent {
  heading: string;
  image: IImage;
  quotes: {
    fields: {
      content: string;
    };
  };
}

export interface IBookingLandingItem {
  confirmationMessage: string;
}

export interface IBookingDetailsPage {
  page: string;
  heading: string;
  mainBlock: string;
  outroBlock: string;
}

export interface IBookingDetails {
  fields: {
    page: string;
    heading: string;
    mainBlock: string;
    outroBlock: string;
  };
}
