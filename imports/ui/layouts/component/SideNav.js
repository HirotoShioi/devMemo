import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../../api/memos.js';
import { labelShare } from '../../../api/labelShare.js';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import '../../partials/AddMemoButton.js';

import './SideNav.html';

TemplateController('SideNav', {
  state: {
    showBottomNav: false,
  },

  onCreated() {
    const self = this;
    self.autorun(()=>{
      self.subscribe('labelShare');

      let labels = labelShare.find({$or: [
      {sharedTo: Meteor.userId(), status: "accepted"},
      {sharedFrom: Meteor.userId(), status: "accepted"}
      ]}).fetch();

      let queryArray = [];
      labels.forEach(function(sharedLabel) {
        queryArray.push({_id: sharedLabel.labelId});
      });
      self.subscribe('label', queryArray);
      self.subscribe('memos', queryArray);
    });
  },

  helpers: {
    username() {
      if (Meteor.user()) {
        return Meteor.user().username;
      } else {
        return false;
      }
    },
  },

  events: {
    'click .logout'() {
      AccountsTemplates.logout();
    },
    'click .link'() {
      Session.set('isSearching', false);
      Session.set('labelBarShow', false);
      this.state.showBottomNav = false;
    },
    'click .bottom-nav'() {
      Session.set('isSearching', false);
      Session.set('labelBarShow', false);
    },
    'click .search-link'() {
      Session.set('labelBarShow', false);
      Session.set('isSearching', !Session.get('isSearching'));
    },
    'click .label-link'() {
      Session.set('isSearching', false);
      Session.set('labelBarShow', !Session.get('labelBarShow'));
    },
    'click .side-nav'() {
      Session.set('labelFormShow', false);
    },
    'click .user'() {
      this.state.showBottomNav = !this.state.showBottomNav;
    }
  }
});
