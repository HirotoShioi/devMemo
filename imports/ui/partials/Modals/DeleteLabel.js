import { TemplateController } from 'meteor/space:template-controller';
import { resetModalForm } from './modalHelper.js';
import { Label } from '../../../api/label.js';
import { Memos } from '../../../api/memos.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './DeleteLabel.html';

TemplateController('DeleteLabel', {
  state: {
    shouldDeleteMemo: false,
    label: {},
  },

  helpers: {
    label() {
      let label = Label.findOne({_id: Session.get('deleteLabelId')});
      this.state.label = label;
      return label;
    },
    hasAnyMemos() {
      const labelId = Session.get('deleteLabelId');
      let memoCount = Memos.find({labelId: labelId}).count();
      return memoCount > 0;
    }
  },

  events: {
    'click .cancel'() {
      resetModalForm();
    },
    'click .delete-label-btn'() {
      Meteor.call('removeLabel', this.state.label._id, this.state.shouldDeleteMemo, (err)=>{
        if (!err) {
          resetModalForm();
        }
      });
    },
    'click .delete-memo-with-label'(event) {
      let isChecked = event.target.checked;
      this.state.shouldDeleteMemo = isChecked;
    }
  }
});
