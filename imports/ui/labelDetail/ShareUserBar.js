import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';
import { labelShare } from '../../api/labelShare.js';

import './ShareUserBar.html';

TemplateController('ShareUserBar', {

  helpers: {
    label() {
      return Label.findOne({_id: this.data.labelId});
    },
    sharedUser() {
      let sharedUsers = labelShare.find({labelId: this.data.labelId, status: "accepted"});
      return sharedUsers;
    },
    isOwner() {
      const label = Label.findOne({_id: this.data.labelId});
      if (label) {
        return (Meteor.userId() === label.owner);
      } else {
        return false;
      }
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

TemplateController('UserChip', {
  state: {
    user: {},
  },

  helpers: {
    username() {
      console.log(this.data);
      const user = Meteor.users.findOne({_id: this.data.user});
      if (user) {
        return user.username;
      } else {
        return false;
      }
    },
  }

});
