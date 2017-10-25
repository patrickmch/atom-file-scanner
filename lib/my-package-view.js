'use babel';

export default class MyPackageView {

  constructor(serializedState) {
    this.active_pane = atom.workspace.getActivePaneItem();
    if (this.active_pane.constructor.name == 'TreeView'){
      this.treeView = atom.workspace.getActivePaneItem();
    }
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
