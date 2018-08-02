import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { addField, SelectInput, Labeled, required } from "react-admin";
import { withStyles } from '@material-ui/core/styles';

import { positionChoices, colorChoices } from "./choices";

const styles = {
  root: {
    display: "flex"
  },
  mediumPositionWrapper: {
    flex: "1 0 0",
    marginRight: "2rem"
  },
  colorWrapper: {
    flex: "1 0 0"
  }
};

const Color = ({ record }) => (
  <div style={{ background: record.name, width: "100%", height: "2rem" }} />
);

export const DisplayOptionsInput = ({ classes, source, label }) => (
  <Labeled label={label || "Display Options"}>
    <div className={classes.root}>
      <div className={classes.mediumPositionWrapper}>
        <SelectInput
          validate={required()}
          source={`${source}.mediumPosition`}
          label="Illustration position"
          choices={positionChoices}
        />
      </div>
      <div className={classes.colorWrapper}>
        <SelectInput
          validate={required()}
          source={`${source}.backgroundColor`}
          label="Background color"
          choices={colorChoices}
          optionText={<Color />}
        />
      </div>
    </div>
  </Labeled>
);

DisplayOptionsInput.propTypes = {
  classes: PropTypes.object,
  source: PropTypes.string.isRequired
};

export default compose(addField, withStyles(styles))(DisplayOptionsInput);
