import './Notification.html';
import { TemplateController } from 'meteor/space:template-controller';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { labelShare } from '../../api/labelShare.js';
import './NotificationItem.js';
import './RequestItem.js';

TemplateController('Notification', {
  onRendered() {
    $(document).ready(function() {
      $('ul.tabs').tabs();
    });
  },
  helpers: {
    notifications() {
      return labelShare.find({sharedFrom: Meteor.userId()}, {sort: {requestSentAt: -1}});
    },
    requests() {
      return labelShare.find({sharedTo: Meteor.userId(), status: "pending"}, {sort: {requestSentAt: -1}});
    },
    notificationCount() {
      return labelShare.find({sharedFrom: Meteor.userId()}).count();
    },
    requestCount() {
      return labelShare.find({sharedTo: Meteor.userId(), status: "pending"}).count();
    },
    unnotifiedResponseCount() {
      const responseCount = labelShare.find({sharedFrom: Meteor.userId(), respondNotified: false}).count();
      return responseCount;
    },
    unnotifiedRequestCount() {
      const requestCount = labelShare.find({sharedTo: Meteor.userId(), requestNotified: false}).count();
      return requestCount;
    }
  },
});
