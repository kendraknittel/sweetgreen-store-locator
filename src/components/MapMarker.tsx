import * as React from "react";
import { Marker } from "react-map-gl";
import {
  Button,
  Intent,
  Popover,
  PopoverPosition,
  Classes
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { StoreFeature } from "../types";

// These ensure that the popover element remains
// positioned correctly while the map animation is occuring
const POPPER_MODIFIERS = {
  flip: { enabled: false },
  preventOverflow: { enabled: false }
};

export namespace MapMarker {
  export interface Props {
    active?: boolean;
    feature: StoreFeature;
    onFeatureSelect: (feature: StoreFeature | undefined) => void;
  }
}

export class MapMarker extends React.PureComponent<MapMarker.Props> {
  public render() {
    const { feature, active } = this.props;
    const { coordinates } = feature.geometry;

    return (
      <Marker latitude={coordinates[1]} longitude={coordinates[0]}>
        <Popover
          isOpen={active}
          usePortal={false}
          position={PopoverPosition.TOP}
          onInteraction={this.handlePopoverInteraction}
          modifiers={POPPER_MODIFIERS}
        >
          <Button
            className="myapp--map-marker"
            intent={Intent.SUCCESS}
            icon={IconNames.MAP_MARKER}
          />
          <div className="myapp--location-details">
            <div className="title">Sweetgreen</div>
            <div className={Classes.TEXT_MUTED}>
              {feature.properties.address}
            </div>
          </div>
        </Popover>
      </Marker>
    );
  }

  private handlePopoverInteraction = (nextOpenState: boolean) => {
    if (nextOpenState) {
      this.props.onFeatureSelect(this.props.feature);
    } else {
      this.props.onFeatureSelect(undefined);
    }
  };
}
