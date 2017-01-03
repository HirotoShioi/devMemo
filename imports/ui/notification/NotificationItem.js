import './NotificationItem.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Meteor } from 'meteor/meteor';
import { Label } from '../../api/label.js';

TemplateController('NotificationItem', {

  helpers: {
    notification() {
      return this.data.notification;
    },
    requestUsername() {
      const user = Meteor.users.findOne({_id: this.data.notification.sharedTo});
      if (user) {
        return user.username;
      } else {
        return false;
      }
    },
    label() {
      const label = Label.findOne({_id: this.data.notification.labelId});
      return label;
    },
    isAccepted() {
      return (this.data.notification.status === "accepted");
    },
    isDenied() {
      return (this.data.notification.status === "denied");
    },
    isPending() {
      return (this.data.notification.status === "pending");
    },
    shouldCancelButtonShow() {
      const isPending = (this.data.notification.status === "pending");
      const isDenied = (this.data.notification.status === "denied");
      return (isPending || isDenied);
    },
  },

  events: {
    'click .cancel-request'() {
      Meteor.call('cancelRequest', this.data.notification._id, (err)=>{
        if (err) {
          Bert.alert({
            type: "danger",
            message: err.reason,
            style: "growl-top-right"
          });
        }
      });
    }
  }
});
