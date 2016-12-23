import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../api/label.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './AddMemoButton.html';

import './Loading.js';

TemplateController('AddMemoButton', {
  onCreated() {
    const self = this;
    self.autorun(()=>{
      self.subscribe('label');
    });
  },

  events: {
    'click #addMemoModal'() {
      const recentlyChosenLabel = Meteor.user().profile.recentChosenLabel;
      let initialLabel;
      const labelCount = Label.find().count();
      if (labelCount <= 0){
        initialLabel = null;
      } else {
        if (! recentlyChosenLabel) {
          initialLabel = Label.findOne()._id;
        } else {
          initialLabel = recentlyChosenLabel;
        }
      }
      Session.set('addMemoSelectedLabelId', initialLabel);
      Session.set('showModal', true);
      Session.set('formType', 'AddMemo');
    },
  },

  helpers:{
    isDisabled(){
      return Session.get('isLoadingMemo');
    }
  }
});