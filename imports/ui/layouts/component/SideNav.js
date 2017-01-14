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
      // self.subscribe('labelShare');
      self.subscribe('label');
      self.subscribe('memos');
      self.subscribe('usernames');
      self.subscribe('MemoLabelShares');
      self.subscribe('userFavorites');
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
    notificationCount() {
      const requestCount = labelShare.find({sharedTo: Meteor.userId(), requestNotified: false}).count();
      const respondCount = labelShare.find({sharedFrom: Meteor.userId(), respondNotified: false}).count();
      return requestCount + respondCount;
    }
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
