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
		insert:function(doc,e){
			Meteor.call('addMemo',doc);
			this.resetForm();
			$('#afModal').closeModal();
		}
	},
}

AutoForm.hooks({
  NewMemo: hooksObject
});