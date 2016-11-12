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
			Session.set('cmDoc',undefined);
		},
	},
});
const hooksObject = {
	before:{
		insert:function(doc){
			let isValidForm = AutoForm.validateForm("NewMemo");
			if(isValidForm){
				Session.set('isLoadingMemo',true);
				this.resetForm();
				$('#afModal').closeModal();
				Meteor.call("addMemo",doc,(err,result)=>{
					Session.set('isLoadingMemo', false);
				});
			}
		}
	},
}
Meteor.Spinner.options = {
	color:"#fff"
};
AutoForm.hooks({
  NewMemo: hooksObject
});