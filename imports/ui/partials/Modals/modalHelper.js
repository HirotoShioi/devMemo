export const resetModalForm = function(){
	Session.set('showModal',false);
	Session.set('modalFormType',null);
	Session.set('deleteLabelId',null);
	Session.set('addMemoSelectedLabelId',null);
	Session.set('modalFormType',null);
	Session.set('editLabelId', null);
};