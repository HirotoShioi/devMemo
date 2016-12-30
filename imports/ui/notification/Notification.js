import './Notification.html';
import { TemplateController } from 'meteor/space:template-controller';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { labelShare } from '../../api/labelShare.js';
import './NotificationItem.js';

TemplateController('Notification', {
  helpers: {
    notifications() {
      return labelShare.find({}, {sort: {requestSentAt: -1}});
    },
    notificationCount() {
      return labelShare.find({}).count();
    },
  },
});
