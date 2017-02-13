import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../../api/memos.js';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Session } from 'meteor/session';

import '../../partials/SearchBar/SearchNavBar.js';

import './Header.html';

TemplateController('Header', {
  onCreated() {
    const self = this;
    self.autorun(()=>{
      // self.subscribe('labelShare');
      self.subscribe('label');
      self.subscribe('memos');
      self.subscribe('usernames');
      self.subscribe('MemoLabelShares');
      self.subscribe('userFavorites');
      self.subscribe('comments');
    });
  },
  helpers: {
    title() {
      return Session.get('Title');
    },
  },

  events: {
    'click .toggle-sidenav'() {
      Session.set('isShrinkedSideNavShown', !Session.get('isShrinkedSideNavShown'));
    },
    'click #slide-out a'() {
      Session.set('isShrinkedSideNavShown', false);
    },
    'click .logout'() {
      AccountsTemplates.logout();
    },
    'click .fa-search'() {
      Session.set('searchQueryHeader', '');
      Session.set('isSearchNavShown', true);
      return false;
    },
  }
});
