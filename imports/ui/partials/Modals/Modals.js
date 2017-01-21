import { TemplateController } from 'meteor/space:template-controller';
import { resetModalForm } from './modalHelper.js';
import { Session } from 'meteor/session';

// modals
import './AddLabelForm.js';
import './AddMemoForm.js';
import './DeleteLabel.js';
import './EditLabel.js';
import './EditMemoLabel.js';
import './MemoDetailModal.js';
import './AddShareUser.js';
import './LeaveShareLabel.js';

import './Modals.html';

TemplateController('Modals', {

  state: {
    canModalDismiss: true,
  },

  helpers: {
    overlayShow() {
      if (Session.get('showModal')) {
        Session.set('modalOverlayShow', true);
      }
      return Session.get('modalOverlayShow');
    },
    modalShow() {
      return Session.get('showModal');
    },
    formType() {
      return Session.get('formType');
    }
  },
  events: {
    'click .fa-close'() {
      resetModalForm();
      return false;
    },
    'mouseenter .modal-form-wrapper'() {
      this.state.canModalDismiss = false;
    },
    'mouseleave .modal-form-wrapper'() {
      this.state.canModalDismiss = true;
    },
    'click .overlay'() {
      if (this.state.canModalDismiss) resetModalForm();
    },
  },
});
