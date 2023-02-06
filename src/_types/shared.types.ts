import { TranslateResult } from 'vue-i18n';

/** Image Editor */
export interface IndexedImage {
  id?: number;
  url?: string;
}

export interface PreviewData {
  title: string;
  catchCopy: string;
  sourceImage: string;
  shopName: string;
  description: string;
  shopURL: string;
  aspectRatio: number;
  image: string;
}

export interface ImageConfig {
  quality: number;
  frameWidth: number;
  minWidth: number;
  aspectRatio: number;
  minHeight: number;
  maxFileSize: number;
  isFacebook?: boolean;
  isYahoo?: boolean;
  isGoogle?: boolean;
  isLine?: boolean;
  provider: string;
}

export interface PaginationRequest {
  page: number;
  filter?: any;
}

export interface PaginatedResponse {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface ConfirmModalContent {
  title?: TranslateResult;
  subTitle?: TranslateResult;
  type?: string;
  content: TranslateResult;
  cancelAction?: Function;
  confirmAction?: Function;
}

export interface ConfirmModalAction {
  text: TranslateResult;
  callback?: Function;
  record?: any;
}

export interface CancelModalAction {
  text: TranslateResult;
  callback?: Function;
  record?: any;
}

export interface OutsideClickModalAction {
  callback?: Function;
  record?: any;
}

export interface MapConfig {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

export interface MapData {
  areaTargeting: {
    type: string;
    selectedPlaces: Array<SelectedPlace>;
  };
}

export interface SelectedPlace {
  parent?: string;
  yahooCode?: string;
  children?: Array<SelectedPlaceChild>;
  code?: string;
  radius?: number;
  name?: string;
  address?: Address;
  latLng?: LatLng;
  nameJP?: string;
  prefectureName?: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface SelectedPlaceChild {
  child: string;
  yahooCode: string;
}

export interface Address {
  latlng: Array<number>;
  prefecture: string;
  city: string;
  street: string;
}

export interface GuideLink {
  path: string;
  name: TranslateResult;
  icon: {
    custom: boolean | CustomIcon;
    name: string;
  };
  provider: string;
  active: boolean;
}

interface CustomIcon {
  component: string;
  attributes: { name: string };
}

export interface PlanType {
  _id: string;
  archive: boolean;
  charges: number;
  created_at: string;
  description: string;
  interval: string;
  name: string;
  plan_type: string;
  price_usd?: number;
  loading: boolean;
  price: number;
  updated_at: string;
}

export enum Preferences {
  withTrash = 'with_trash',
}
