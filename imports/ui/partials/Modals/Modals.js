import { TemplateController } from 'meteor/space:template-controller';
import './Modals.html';
import { resetModalForm } from './modalHelper.js';
//modals
import './AddLabelForm.js';
import './AddMemoForm.js';
import './DeleteLabel.js';
import './EditLabel.js';
import './EditMemoLabel.js';

TemplateController('Modals',{

	helpers:{
		overlayShow(){
			if(Session.get('showModal')){
				Session.set('modalOverlayShow',true);
			}
			return Session.get('modalOverlayShow');
		},
		modalShow(){
			return Session.get('showModal');
		},
		formType(){
			return Session.get('formType');
		}
	},
	events:{
		'click .fa-close'(){
			resetModalForm();
			return false;
		},
		'click .overlay'(){
			resetModalForm();
		},
	},
});