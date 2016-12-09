import './PageTitle.html';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('PageTitle',{
	helpers:{
		title(){
			return Session.get('Title');
		}
	},
});