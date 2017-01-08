import { Session } from 'meteor/session';

export const resetModalForm = function() {
  if (Session.get('isLoadingModal')) {
    return;
  }
  Session.set('showModal', false);
  Session.set('formType', null);
  Session.set('showMemoDetail', false);
  // ids
  setTimeout(()=>{
    Session.set('addLabelSelectedColor', "#40c4ff");
    Session.set('deleteLabelId', null);
    Session.set('addMemoSelectedLabelId', null);
    Session.set('editLabelId', null);
    Session.set('editMemoLabelId', null);
    Session.set('modalOverlayShow', false);
    Session.set('MemoDetailId', false);
    Session.set('sharedLabelId', null);
    Session.set('leaveLabelId', null);
  }, 300);
};
