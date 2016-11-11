import * as React from "react";
import update = require('react-addons-update');
import { Panel } from "react-bootstrap";
import Rule from '../model/Rule'
import {CellBlock} from "../model/CellBlock";

interface CellBlockViewProps {
  cells: CellBlock
}

export default class CellBlockView extends React.Component<CellBlockViewProps, {}> {
  render() {
    return (
        <div>
          { this.props.cells.toString() }
        </div>
    );
  }
}