import * as React from "react";
import ReactMapGL from "react-map-gl";
import { AutoSizer } from "react-virtualized";
import { stores } from "../data/stores";
import { Viewport, StoreFeature } from "../types";
import { MapMarker } from "./MapMarker";

const MAPBOX_TOKEN = ""; // Set your mapbox token here

export namespace Map {
  export interface Props {
    selectedFeature: StoreFeature | undefined;
    viewport: Viewport;
    onFeatureSelect: (feature: StoreFeature | undefined) => void;
    onViewportChange: (newState: Viewport) => void;
  }
}

export class Map extends React.PureComponent<Map.Props> {
  private mapRef = React.createRef<ReactMapGL>();

  public render() {
    const {
      selectedFeature,
      viewport,
      onFeatureSelect,
      onViewportChange
    } = this.props;
    return (
      <div className="myapp--map-wrapper">
        <AutoSizer>
          {({ width, height }) => (
            <ReactMapGL
              {...viewport}
              ref={this.mapRef}
              className="myapp--map"
              mapStyle="mapbox://styles/mapbox/light-v9"
              width={width}
              height={height}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              onViewportChange={onViewportChange}
            >
              {stores.features.map((feature: StoreFeature) => (
                <MapMarker
                  active={
                    selectedFeature !== undefined &&
                    selectedFeature.properties.address ==
                      feature.properties.address
                  }
                  feature={feature}
                  onFeatureSelect={onFeatureSelect}
                />
              ))}
            </ReactMapGL>
          )}
        </AutoSizer>
      </div>
    );
  }
}
