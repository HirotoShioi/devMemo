import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../../api/label.js';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Session } from 'meteor/session';
import { i18n } from 'meteor/anti:i18n';
import '../../partials/Loading.js';

import './addBookmark.html';

TemplateController('addBookmark', {

  helpers: {
    isLoading() {
      return Session.get('isLoadingModal');
    },
    selectedLabelId() {
      let chosenLabel = Session.get('addMemoSelectedLabelId');
      if (!chosenLabel) {
        const recentlyChosenLabel = Meteor.user().profile.recentChosenLabel;
        let initialLabel;
        const labelCount = Label.find().count();
        if (labelCount <= 0) {
          initialLabel = null;
        } else {
          if (! recentlyChosenLabel) {
            initialLabel = Label.findOne()._id;
          } else {
            initialLabel = recentlyChosenLabel;
          }
        }
        Session.set('addMemoSelectedLabelId', initialLabel);
      }
      return chosenLabel;
    },
    labels() {
      let labels = Label.find({}, {sort: {createdAt: -1}});
      return labels;
    },
    schema() {
      const schema = new SimpleSchema({
        url: {
          type: String,
          label: "URL",
          regEx: SimpleSchema.RegEx.Url
        },
      });
      return schema;
    },
  },

  events: {
    'click .label-select'(event) {
      const selectedLabelId = event.target.attributes.data.value;
      Session.set('addMemoSelectedLabelId', selectedLabelId);
    },
  }
});
const hooksObject = {
  onSubmit: function(insertDoc) {
    this.event.preventDefault();
    let labelId = Session.get('addMemoSelectedLabelId');
    let memoDoc = {
      url: insertDoc.url,
      labelId: labelId
    };
    Session.set('isLoadingModal', true);
    Session.set('showModal', false);
    Meteor.call('addMemo', memoDoc, (err)=>{
      Session.set('isLoadingModal', false);
      this.resetForm();
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
          message: i18n('forms.addMemo.success'),
          style: "growl-top-right"
        });
        Router.go('memo.home');
      }
    });
    this.done();
  },
};
AutoForm.hooks({
  addBookmark: hooksObject
});
