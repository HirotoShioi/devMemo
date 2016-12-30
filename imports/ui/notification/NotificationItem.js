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
    isRequestedUser() {
      return (Meteor.userId() === this.data.notification.sharedTo);
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

  events: {
    'click .accept-share'() {
      Meteor.call('acceptShare', this.data.notification._id);
    },
    'click .deny-share'() {
      Meteor.call('denyShare', this.data.notification._id);
    },
  }
});
