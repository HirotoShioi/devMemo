import { TemplateController } from 'meteor/space:template-controller';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Memos } from '../../../api/memos.js';
import { resetModalForm } from './modalHelper.js';
import { Session } from 'meteor/session';

import './EditMemoLabel.html';

TemplateController('EditMemoLabel', {
  state: {
    memo: {}
  },
  onCreated() {
    const self = this;
  },
  helpers: {
    memo() {
      let memo = Memos.findOne({_id: Session.get('editMemoLabelId')});
      this.state.memo = memo;
      return memo;
    },
  },
});
const hooksObject = {
  onSuccess: function() {
    resetModalForm();
  },
};
AutoForm.hooks({
  editMemoLabel: hooksObject
});
