import { TemplateController } from 'meteor/space:template-controller';
import { AutoForm } from 'meteor/aldeed:autoform';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
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
          label: function() {return i18n('collection.label.name');},
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
    };
    Meteor.call('requestUser', requestObj, (err, result)=>{
      resetModalForm();
      if (err) {
        return;
      }
      if (result) {
        this.resetForm();
      }
    });
    this.done();
  },
};
AutoForm.hooks({
  addShareUser: hooksObject
});
