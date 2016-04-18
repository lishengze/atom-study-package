'use babel';

import TestServerView from './test-server-view';
import { CompositeDisposable } from 'atom';

export default {

  testServerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testServerView = new TestServerView(state.testServerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testServerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-server:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testServerView.destroy();
  },

  serialize() {
    return {
      testServerViewState: this.testServerView.serialize()
    };
  },

  toggle() {
    console.log('TestServer was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
