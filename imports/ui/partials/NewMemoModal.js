import './NewMemoModal.html';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('NewMemoModal',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('status');
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
				Meteor.call("addMemo",doc);
				this.resetForm();
				$('#afModal').closeModal();
			}
		}
	},
}

AutoForm.hooks({
  NewMemo: hooksObject
});