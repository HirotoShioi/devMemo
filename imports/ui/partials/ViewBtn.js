import './ViewBtn.html';

import { TemplateController } from 'meteor/space:template-controller';

TemplateController('ViewBtn',{
	helpers:{
		check(){
			return Session.get('hideExpired');
		},
	},

	events:{
		'click .card-view'(){
			Session.set('ListMode',false);
		},
		'click .list-view'(){
			Session.set('ListMode',true);
		},
		'click .filled-in'(event){
			let isChecked = event.target.checked;
			Session.set('hideExpired', isChecked);
		}
	},
});