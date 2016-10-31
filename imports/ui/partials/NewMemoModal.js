import './NewMemoModal.html';


Template.NewMemoModal.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('status');
	});
});

Template.NewMemoModal.helpers({
});

Template.NewMemoModal.events({
	'click .addMemoModal'(){
		Session.set('cmDoc',undefined);
	}
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