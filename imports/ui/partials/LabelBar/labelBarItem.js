import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';

import './labelBarItem.html';

TemplateController('labelBarItem', {
  state: {
    shouldOptionShow: false,
  },

  helpers: {
    labelId() {
      const labelId = {
        labelId: this.data.label._id
      };
      return labelId;
    },
  },

  events: {
    'click .title'() {
      Session.set('labelBarShow', false);
    },
    'click .fa-trash'() {
      Session.set('showModal', true);
      Session.set('formType', 'DeleteLabel');
      Session.set('deleteLabelId', this.data.label._id);
    },
    'click .fa-pencil'() {
      Session.set('showModal', true);
      Session.set('formType', 'EditLabel');
      Session.set('editLabelId', this.data.label._id);
    },
    'click .label-bar-chip'() {
      Session.set('labelBarShow', false);
    },
    'mouseover .search-item'() {
      if (Meteor.userId() !== this.data.label.owner) return;
      this.state.shouldOptionShow = true;
    },
    'mouseout .search-item'() {
      this.state.shouldOptionShow = false;
    },
  },
});
