import './NotificationItem.html';
import { TemplateController } from 'meteor/space:template-controller';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

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
    notification() {
      return this.state.notification;
    },
  }
});
