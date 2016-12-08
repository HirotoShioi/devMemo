import { TemplateController } from 'meteor/space:template-controller';
import './Modals.html';

//modals
import './AddLabelForm.js';
import './AddMemoForm.js';
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
			Session.set('showModal',false);
		},
		'click .overlay'(){
			Session.set('showModal',false);
		},
	},
});