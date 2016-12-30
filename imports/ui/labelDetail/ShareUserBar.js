import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';
import { Label } from '../../api/label.js';

import './ShareUserBar.html';

TemplateController('ShareUserBar', {
  state: {

  },

  helpers: {
    owner() {
      const label = Label.findOne({_id: this.data.labelId});
      return (Meteor.userId() === label.owner) ? true : false;
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
