import './RequestItem.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

TemplateController('RequestItem', {
  state: {
    request: {}
  },

  onRendered() {
    this.state.request = this.data.request;
  },

  helpers: {
    requestUsername() {
      const user = Meteor.users.findOne({_id: this.data.request.sharedFrom});
      if (user) {
        return user.username;
      } else {
        return false;
      }
    },
  },

  events: {
    'click .accept-share'() {
      Meteor.call('acceptShare', this.data.request._id, (err)=>{
        if (err) {
          Bert.alert({
            type: "danger",
            message: err.reason,
            style: "growl-top-right"
          });
        }
        if (!err) {
          Bert.alert({
            type: "success",
            message: i18n('notification.share.success'),
            style: "growl-top-right"
          });
        }
      });
    },
    'click .deny-share'() {
      Meteor.call('denyShare', this.data.request._id, (err)=>{
        if (err) {
          Bert.alert({
            type: "danger",
            message: err.reason,
            style: "growl-top-right"
          });
        }
      });
    },
  }
});
