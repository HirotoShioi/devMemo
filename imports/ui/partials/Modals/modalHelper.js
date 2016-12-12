export const resetModalForm = function(){
	if(Session.get('isLoadingModal')){
		return;
	}
	Session.set('showModal',false);
	Session.set('formType',null);
	//ids
	setTimeout(()=>{
		Session.set('addLabelSelectedColor',"#e4e4e4");
		Session.set('deleteLabelId',null);
		Session.set('addMemoSelectedLabelId',null);
		Session.set('editLabelId', null);
		Session.set('editMemoLabelId', null);
		Session.set('modalOverlayShow',false);
	},300);
};