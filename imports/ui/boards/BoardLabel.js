import './BoardLabel.html';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('BoardLabel',{
	events:{
		'click .label-chip'(){
			Session.set('Title',{name:this.data.label.name});
			Router.go('label.detail',{labelId:this.data.label._id});
			return false;
		},
	}
});