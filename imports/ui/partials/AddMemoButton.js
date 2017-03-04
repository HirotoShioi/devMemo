import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../api/label.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { rwindow } from 'meteor/gadicohen:reactive-window';
import './AddMemoButton.html';

import './Loading.js';

TemplateController('AddMemoButton', {

  events: {
    'click #addMemoModal'() {
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
      if (rwindow.$width() < 992) {
        Router.go('mobile.addBookmark');
      } else {
        Session.set('showModal', true);
        Session.set('formType', 'AddMemo');
      }
    },
  },

  helpers: {
    isDisabled() {
      return Session.get('isLoadingMemo');
    }
  }
});
