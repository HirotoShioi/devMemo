import './Home.html';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('Home',{
	onCreated(){
		Session.set('Title',{name:"DevMemo"});
	},
});