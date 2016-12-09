import './NewMemoModal.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../api/label.js';
import './Loading.js';
TemplateController('NewMemoModal',{
	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('label');
		});
	},

	events:{
		'click .addMemoModal'(){

			Session.set('showModal',true);
			Session.set('formType','AddMemo');
		},
	},

	helpers:{
		isDisabled(){
			return Session.get('isLoadingMemo');
		}
	}
});

Meteor.Spinner.options = {
	color:"#000"
};