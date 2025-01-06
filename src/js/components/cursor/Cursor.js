import CursorModel from "./CursorModel";
import CursorView from "./CursorView";
import CursorController from "./CursorController";
import "./cursor.scss";

export default class Cursor {
  constructor(options) {
    this.view = new CursorView();
    this.model = new CursorModel(this.view, options);
    this.controller = new CursorController(this.model, this.view);
  }

  render() {
    return this.view.render();
  }
}
