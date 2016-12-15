import './Featured.html';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('Featured',{
	onCreated(){
		Session.set('Title',{name:"Featured"});
	},
});