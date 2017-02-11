import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';

import './Overlay.html';

TemplateController('Overlay', {
  helpers: {
    shouldOverlayShow() {
      if ( Session.get('isShrinkedSideNavShown') || Session.get('isSearching') || Session.get('labelBarShow')) {
        return true;
      } else if (!Meteor.userId()) {
        return false;
      } else {
        return false;
      }
    },
  },
  events: {
    'click .sidebar-overlay'() {
      Session.set('isShrinkedSideNavShown', false);
      Session.set('isSearchNavShown', false);
      Session.set('isSearching', false);
      Session.set('labelBarShow', false);
      Session.set('labelFormShow', false);
    },
  },
});
