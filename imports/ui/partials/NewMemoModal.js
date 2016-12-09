import './NewMemoModal.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../api/label.js';

TemplateController('NewMemoModal',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('label');
		});
	},

	events:{
		'click .addMemoModal'(){
			Session.set('showModal',true);
			Session.set('formType','AddMemo');
		},
	},
});

Meteor.Spinner.options = {
	color:"#fff"
};