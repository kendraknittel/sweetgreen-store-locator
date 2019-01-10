import * as classNames from "classnames";
import * as React from "react";
import { H3, Classes, ButtonGroup } from "@blueprintjs/core";
import { stores } from "../data/stores";
import { StoreFeature } from "../types";
import { ListItem } from "./ListItem";

export namespace Sidebar {
  export interface Props {
    selectedFeature: StoreFeature | undefined;
    onFeatureSelect: (feature: StoreFeature | undefined) => void;
  }
}

export class Sidebar extends React.PureComponent<Sidebar.Props> {
  public render() {
    const { onFeatureSelect, selectedFeature } = this.props;

    return (
      <div className={classNames("myapp--sidebar", Classes.ELEVATION_2)}>
        <div className="heading">
          <H3>Our locations</H3>
        </div>
        <ButtonGroup className="listings" vertical={true} minimal={true}>
          {stores.features.map((feature: StoreFeature, i: number) => {
            return (
              <ListItem
                key={i}
                feature={feature}
                active={
                  selectedFeature !== undefined &&
                  selectedFeature.properties.address ==
                    feature.properties.address
                }
                onFeatureSelect={onFeatureSelect}
              />
            );
          })}
        </ButtonGroup>
      </div>
    );
  }
}
