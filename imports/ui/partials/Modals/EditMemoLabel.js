import { TemplateController } from 'meteor/space:template-controller';
import { AutoForm } from 'meteor/aldeed:autoform';
import './EditMemoLabel.html';
import { Memos } from '../../../api/memos.js';
import { resetModalForm } from './modalHelper.js';

TemplateController('EditMemoLabel',{
	state:{
		memo:{}
	},
	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('memos');
		});
	},
	helpers:{
		memo(){
			let memo = Memos.findOne({_id:Session.get('editMemoLabelId')});
			this.state.memo = memo;
			return memo;
		},
	},
});
const hooksObject = {
	onSuccess: function(formType, result) {
		resetModalForm();
	},
};
AutoForm.hooks({
  editMemoLabel: hooksObject
});