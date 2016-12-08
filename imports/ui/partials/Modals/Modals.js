import { TemplateController } from 'meteor/space:template-controller';
import './Modals.html';
import { resetModalForm } from './modalHelper.js';
//modals
import './AddLabelForm.js';
import './AddMemoForm.js';
import './DeleteLabel.js';

TemplateController('Modals',{
	helpers:{
		modalShow(){
			return Session.get('showModal');
		},
		formType(){
			return Session.get('modalFormType');
		}
	},
	events:{
		'click .fa-close'(){
			resetModalForm();
		},
		'click .overlay'(){
			resetModalForm();
		},
	},
});