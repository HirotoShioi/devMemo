import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';

import './ShareUserBar.html';

TemplateController('ShareUserBar', {
  state: {

  },

  helpers: {
    isOwner() {
      return (Meteor.userId() === this.data.owner);
    }
  },

  events: {
    'click .add-share-user'() {
      Session.set('showModal', true);
      Session.set('formType', 'AddShareUser');
      Session.set('sharedLabelId', this.data.labelId);
    }
  }
});
