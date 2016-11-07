import './ViewBtn.html';

import { TemplateController } from 'meteor/space:template-controller';

TemplateController('ViewBtn',{
	events:{
		'click .card-view'(){
			Session.set('ListMode',false);
		},
		'click .list-view'(){
			Session.set('ListMode',true);
		},
	},
});