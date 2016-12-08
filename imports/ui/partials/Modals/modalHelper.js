export const resetModalForm = function(){
	Session.set('showModal',false);
	Session.set('modalFormType',null);
	Session.set('modalFormType',null);
	//ids
	Session.set('deleteLabelId',null);
	Session.set('addMemoSelectedLabelId',null);
	Session.set('editLabelId', null);
	Session.set('editMemoLabelId', null);
};