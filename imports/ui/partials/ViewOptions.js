import './ViewOptions.html';
import { Session } from 'meteor/session';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('ViewOptions', {
  helpers: {
    check() {
      return Session.get('hideExpired');
    },
  },

  events: {
    'click .card-view'() {
      Session.set('ListMode', false);
    },
    'click .list-view'() {
      Session.set('ListMode', true);
    },
    'click .filled-in'(event) {
      let isChecked = event.target.checked;
      Session.set('hideExpired', isChecked);
    }
  },
});
