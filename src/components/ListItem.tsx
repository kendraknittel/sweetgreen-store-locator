import * as classNames from "classnames";
import * as React from "react";
import { Classes, Button, Intent } from "@blueprintjs/core";
import { StoreFeature } from "../types";

export namespace ListItem {
  export interface Props {
    active?: boolean;
    feature: StoreFeature;
    onFeatureSelect: (feature: StoreFeature | undefined) => void;
  }
}

export class ListItem extends React.PureComponent<ListItem.Props> {
  public render() {
    const { feature, active } = this.props;
    const { address, city, phoneFormatted } = feature.properties;
    return (
      <Button
        className={classNames("myapp--list-item", {
          [Classes.ACTIVE]: active
        })}
        onClick={this.handleClick}
        intent={Intent.SUCCESS}
      >
        <div>{address}</div>
        <div className={Classes.TEXT_MUTED}>
          {city}
          {phoneFormatted != null && " · "}
          {phoneFormatted}
        </div>
      </Button>
    );
  }

  private handleClick = () => {
    this.props.onFeatureSelect(this.props.feature);
  };
}
