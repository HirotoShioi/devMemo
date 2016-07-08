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
})