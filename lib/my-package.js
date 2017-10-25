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
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('.tree-view', {
      'my-package:openFiles': () => this.openFileUp()
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

  openFileUp(){
    atom.commands.dispatch(this.myPackageView.treeView.selectedEntry(), 'core:move-up');
    atom.commands.onDidDispatch(() => this.openFiles(), 'core:move-up');
  },

  openFiles() {
    fs.stat(this.myPackageView.treeView.selectedPath, (err, stat) =>{
      if (err) throw err;
      atom.workspace.open(this.myPackageView.treeView.selectedPath, {pending : true, activatePane: false});
    });
  },


};
