import { TemplateController } from 'meteor/space:template-controller';
import './Modals.html';

//modals
import './AddLabelForm.js';

TemplateController('Modals',{
	helpers:{
		modalShow(){
			return Session.get('showModal');
		},
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