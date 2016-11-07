import { TemplateController } from 'meteor/space:template-controller';
import './Overlay.html';

TemplateController('Overlay',{
	events:{
		'click .overlay-show'(){
			Session.set('sideNav',false);
		},
	},
});