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
		console.log("check");
		Session.set('cmDoc',undefined);
	}
})