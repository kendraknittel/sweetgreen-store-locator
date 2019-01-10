import * as d3 from "d3-ease";
import * as React from "react";
import { hot } from "react-hot-loader";
import { FlyToInterpolator } from "react-map-gl";
import { Map } from "./Map";
import { Sidebar } from "./Sidebar";
import { Viewport, StoreFeature } from "../types";

const INITIAL_VIEW_STATE: Viewport = {
  latitude: 38.909671,
  longitude: -77.034084,
  zoom: 14,
  transitionDuration: 0,
  transitionInterpolator: new FlyToInterpolator(),
  transitionEasing: d3.easeCubic
};

// This can also be pulled out into a redux store,
// or sent to a server if you want state to persist
interface AppInternalState {
  viewport: Viewport;
  selectedFeature: StoreFeature | undefined;
}

class AppInternal extends React.PureComponent<{}, AppInternalState> {
  private mapRef = React.createRef<Map>();

  public state = {
    viewport: INITIAL_VIEW_STATE,
    selectedFeature: undefined
  };

  render() {
    const { selectedFeature } = this.state;

    return (
      <div className="myapp">
        <Sidebar
          selectedFeature={selectedFeature}
          onFeatureSelect={this.handleFeatureSelect}
        />
        <Map
          ref={this.mapRef}
          viewport={this.state.viewport}
          selectedFeature={selectedFeature}
          onFeatureSelect={this.handleFeatureSelect}
          onViewportChange={this.handleViewportChange}
        />
      </div>
    );
  }

  private handleFeatureSelect = (feature: StoreFeature | undefined) => {
    if (feature != null && this.mapRef.current != null) {
      const { coordinates } = feature.geometry;

      // GeoJSON standard is to store coordinates as [long, lat] pairs
      const latitude = coordinates[1];
      const longitude = coordinates[0];

      const viewport = {
        ...this.state.viewport,
        latitude,
        longitude,
        zoom: 15,
        transitionDuration: 1000
      };

      this.setState({ viewport, selectedFeature: feature });
    } else {
      this.setState({ selectedFeature: feature });
    }
  };

  private handleViewportChange = (viewport: Viewport) => {
    this.setState({ viewport });
  };
}

export const App: React.ComponentClass<{}> = hot(module)(AppInternal);
