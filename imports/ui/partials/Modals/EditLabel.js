import { TemplateController } from 'meteor/space:template-controller';
import './EditLabel.html';
import { Label } from '../../../api/label.js';
import { AutoForm } from 'meteor/aldeed:autoform';
import { resetModalForm } from './modalHelper.js';
import { Session } from 'meteor/session';

TemplateController('EditLabel', {
  state: {
    label: {}
  },
  onCreated() {
    const self = this;
    self.autorun(()=>{
      self.subscribe('label');
    });
  },
  helpers: {
    label() {
      let label = Label.findOne({_id: Session.get('editLabelId')});
      this.state.label = label;
      return label;
    },
  },
});
const hooksObject = {
  onSuccess: function() {
    resetModalForm();
  },
};
AutoForm.hooks({
  editLabel: hooksObject
});
