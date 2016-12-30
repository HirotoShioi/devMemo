import './Notification.html';
import { TemplateController } from 'meteor/space:template-controller';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { labelShare } from '../../api/labelShare.js';
import './NotificationItem.js';
import './RequestItem.js';

TemplateController('Notification', {
  helpers: {
    notifications() {
      return labelShare.find({sharedFrom: Meteor.userId()}, {sort: {requestSentAt: -1}});
    },
    requests() {
      return labelShare.find({sharedTo: Meteor.userId()}, {sort: {requestSentAt: -1}});
    },
    notificationCount() {
      return labelShare.find({sharedFrom: Meteor.userId()}).count();
    },
    requestCount() {
      return labelShare.find({sharedTo: Meteor.userId()}).count();
    }
  },
});
