export const resetModalForm = function(){
	Session.set('showModal',false);
	Session.set('formType',null);
	//ids
	Session.set('deleteLabelId',null);
	Session.set('addMemoSelectedLabelId',null);
	Session.set('editLabelId', null);
	Session.set('editMemoLabelId', null);
};