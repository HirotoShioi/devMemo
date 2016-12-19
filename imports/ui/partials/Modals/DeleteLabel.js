import { TemplateController } from 'meteor/space:template-controller';
import { resetModalForm } from './modalHelper.js';
import { Label } from '../../../api/label.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './DeleteLabel.html';

TemplateController('DeleteLabel', {
  state: {
    label: {},
  },
  onCreated() {
    const self = this;
  },
  helpers: {
    label() {
      let label = Label.findOne({_id: Session.get('deleteLabelId')});
      this.state.label = label;
      return label;
    },
  },

  events: {
    'click .cancel'() {
      resetModalForm();
    },
    'click .delete-label-btn'() {
      Meteor.call('removeLabel', this.state.label._id, (err)=>{
        if (!err) {
          resetModalForm();
        }
      });
    },
  }
});
