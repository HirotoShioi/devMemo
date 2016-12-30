import './NotificationItem.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Meteor } from 'meteor/meteor';

TemplateController('NotificationItem', {
  state: {
    notification: {}
  },

  onRendered() {
    this.state.notification = this.data.notification;
  },

  helpers: {
    username() {
      const user = Meteor.users.findOne({_id: this.data.notification.sharedFrom});
      return user.username;
    },
  },

  events: {
    'click .accept-share'() {
      Meteor.call('acceptShare', this.state.notification._id);
    },
    'click .deny-share'() {
      Meteor.call('denyShare', this.state.notification._id);
    },
  }
});
