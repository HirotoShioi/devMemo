import './RequestItem.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Meteor } from 'meteor/meteor';

TemplateController('RequestItem', {
  state: {
    request: {}
  },

  onRendered() {
    this.state.request = this.data.request;
  },

  helpers: {
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
      Meteor.call('acceptShare', this.data.request._id);
    },
    'click .deny-share'() {
      Meteor.call('denyShare', this.data.request._id);
    },
  }
});
