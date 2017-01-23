import { TemplateController } from 'meteor/space:template-controller';
import { AutoForm } from 'meteor/aldeed:autoform';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { i18n } from 'meteor/anti:i18n';
import { Bert } from 'meteor/themeteorchef:bert';

import { resetModalForm } from './modalHelper.js';

import './AddShareUser.html';

TemplateController('AddShareUser', {
  state: {
    label: {}
  },
  helpers: {
    schema() {
      const schema = new SimpleSchema({
        username: {
          type: String,
          max: 15,
          label: function() {return i18n('collection.users.label');},
        },
        message: {
          type: String,
          optional: true,
          max: 100,
          label: function() {return i18n('collection.users.shareLabelMessage');},
        },
      });
      return schema;
    },
  },
});
const hooksObject = {
  onSubmit: function(insertDoc) {
    this.event.preventDefault();
    const shareLabelId = Session.get('sharedLabelId');
    requestObj = {
      username: insertDoc.username,
      labelId: shareLabelId,
      message: insertDoc.message,
    };
    Meteor.call('requestUser', requestObj, (err, result)=>{
      resetModalForm();
      if (err) {
        if (err.error === 'notAuthorized' || err.error === 'userDoesNotExist' ||  err.error === 'requestAlreadySent') {
          Bert.alert({
            type: "warning",
            message: i18n(`errors.${err.error}`),
            style: "growl-top-right"
          });
        } else {
          Bert.alert({
            type: "danger",
            message: i18n(`errors.unknownError`),
            style: "growl-top-right"
          });
        }
      }
      if (result) {
        Bert.alert({
          type: "success",
          message: i18n('forms.addShareUser.success'),
          style: "growl-top-right"
        });
        this.resetForm();
      }
    });
    this.done();
  },
};
AutoForm.hooks({
  addShareUser: hooksObject
});
