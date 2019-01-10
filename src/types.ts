import { ViewState, InteractiveMapProps } from "react-map-gl";

export interface StoreProperties {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;

  // Optional values
  phone?: string;
  phoneFormatted?: string;
  crossStreet?: string;
  cc?: string;
}

export type StoreFeature = GeoJSON.Feature<GeoJSON.Point, StoreProperties>;
export type StoreFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.Point,
  StoreProperties
>;

export type Viewport = ViewState & Partial<InteractiveMapProps>;
