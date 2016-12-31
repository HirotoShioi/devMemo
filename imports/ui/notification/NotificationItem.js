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
    requestUsername() {
      const user = Meteor.users.findOne({_id: this.data.notification.sharedTo});
      if (user) {
        return user.username;
      } else {
        return false;
      }
    },
    isAccepted() {
      return (this.data.notification.status === "accepted");
    },
    isDenied() {
      return (this.data.notification.status === "denied");
    },
    isPending() {
      return (this.data.notification.status === "pending");
    }
  },
});
