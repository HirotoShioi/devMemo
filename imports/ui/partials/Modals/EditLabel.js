import { TemplateController } from 'meteor/space:template-controller';
import './EditLabel.html';
import { Label } from '../../../api/label.js';
import { resetModalForm } from './modalHelper.js';

TemplateController('EditLabel',{
	state:{
		label:{}
	},
	onCreated(){
		this.autorun(()=>{
			this.subscribe('label');
		});
	},
	helpers:{
		label(){
			let label = Label.findOne({_id:Session.get('editLabelId')});
			this.state.label = label;
			return label;
		},
	},
});
const hooksObject = {
	onSuccess: function(formType, result) {
		resetModalForm();
	},
};
AutoForm.hooks({
  editLabel: hooksObject
});