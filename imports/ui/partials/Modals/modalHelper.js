export const resetModalForm = function(){
	Session.set('showModal',false);
	Session.set('formType',null);
	//ids
	setTimeout(()=>{
		Session.set('deleteLabelId',null);
		Session.set('addMemoSelectedLabelId',null);
		Session.set('editLabelId', null);
		Session.set('editMemoLabelId', null);
		Session.set('modalOverlayShow',false);
	},300);
};