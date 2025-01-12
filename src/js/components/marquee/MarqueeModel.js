export default class MarqueeModel {
  constructor(view, data, rowsCount, app) {
    this.view = view;
    this.data = data;

    this.locationSettings = {
      rowsCount: rowsCount,
      baseItemsCountInRow: this.getBaseItemsCountInRow(rowsCount),
      extraItemsCountInRow: this.getExtraItemsCountInRow(rowsCount),
    }

    this.rowsData = null;

    this.app = app;
    this.app.addListenerOfGettingScrollingSpeed(this.updateMovingOnScroll.bind(this));
  }

  updateMoving() {
    this.rowsData.forEach(rowData => {
      rowData.blocksData.forEach(blockObj => {
        if (blockObj.posX <= blockObj.leftLimit) blockObj.posX = blockObj.startPosLeft;
        else if (blockObj.posX >= blockObj.rightLimit) blockObj.posX = blockObj.startPosRight;

        blockObj.posX += rowData.speed;
      });
    });

    this.view.updateMoving(this.rowsData);
  }
  updateMovingOnMousemove(posX) {
    this.rowsData.forEach(rowData => {
      rowData.blocksData.forEach(blockObj => {
        if (blockObj.posX <= blockObj.leftLimit) blockObj.posX = blockObj.startPosLeft;
        else if (blockObj.posX >= blockObj.rightLimit) blockObj.posX = blockObj.startPosRight;

        if (rowData.direction === "left") blockObj.posX -= 1.5 * posX;
        else blockObj.posX += 1.5 * posX;
      });
    });

    this.view.updateMoving(this.rowsData);
  }
  updateMovingOnScroll(speedOfScrollingPixels) {
    if (!this.rowsData) return;
    
    this.rowsData.forEach(rowData => {
      rowData.blocksData.forEach(blockObj => {
        if (blockObj.posX <= blockObj.leftLimit) blockObj.posX = blockObj.startPosLeft;
        else if (blockObj.posX >= blockObj.rightLimit) blockObj.posX = blockObj.startPosRight;

        if (rowData.direction === "left") blockObj.posX -= 5 * Math.abs(speedOfScrollingPixels);
        else blockObj.posX += 5 * Math.abs(speedOfScrollingPixels);
      });
    });
  }

  initRowsData(rowsData) {
    this.rowsData = rowsData;
  }

  transformData(data) {
    const newData = [];
    let startIndex = 0;

    for (let i = 0; i < this.locationSettings.rowsCount; i++) {
      const count = this.locationSettings.baseItemsCountInRow + (i < this.locationSettings.extraItemsCountInRow ? 1 : 0);

      newData.push(data.slice(startIndex, startIndex + count));

      startIndex += count;
    }

    return newData;
  }
  getBaseItemsCountInRow(rowsCount) {
    return Math.floor(this.data.length / rowsCount);
  }
  getExtraItemsCountInRow(rowsCount) {
    return this.data.length % rowsCount;
  }

  // инициализация
  init() {
    this.view.init(this.transformData(this.data));
  }
}
