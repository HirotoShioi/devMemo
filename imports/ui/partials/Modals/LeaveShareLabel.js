import { TemplateController } from 'meteor/space:template-controller';
import { resetModalForm } from './modalHelper.js';
import { Label } from '../../../api/label.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './LeaveShareLabel.html';

TemplateController('LeaveShareLabel', {
  state: {
    label: {},
  },
  helpers: {
    label() {
      let label = Label.findOne({_id: Session.get('leaveLabelId')});
      this.state.label = label;
      return label;
    },
  },

  events: {
    'click .cancel'() {
      resetModalForm();
    },
    'click .leave-share-label'() {
      Meteor.call('leaveSharedLabel', this.state.label._id, (err)=>{
        if (!err) {
          resetModalForm();
          Router.go('memo.home');
        }
      });
    },
  }
});
