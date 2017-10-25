'use babel';
const fs = require('fs');

import MyPackageView from './my-package-view';
import { CompositeDisposable, PackageManager } from 'atom';

export default {

  myPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPackageView = new MyPackageView(state.myPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('.tree-view', {
      'my-package:openFiles': () => this.openFiles()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPackageView.destroy();
  },

  serialize() {
    return {
      myPackageViewState: this.myPackageView.serialize()
    };
  },

  openFiles() {
    let active_pane = atom.workspace.getActivePaneItem();
    if (active_pane.constructor.name == 'TreeView'){
      let treeView = atom.workspace.getActivePaneItem();
      atom.commands.dispatch(treeView.selectedEntry(), 'core:move-up');
      fs.stat(treeView.selectedPath, (err, stat) =>{
        if (err) throw err;
        atom.workspace.open(treeView.selectedPath, {pending : true, activatePane: false});
      });
    }


  },


};
