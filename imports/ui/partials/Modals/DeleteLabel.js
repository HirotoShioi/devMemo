import { TemplateController } from 'meteor/space:template-controller';
import { resetModalForm } from './modalHelper.js';
import './DeleteLabel.html';
import { Label } from '../../../api/label.js';

TemplateController('DeleteLabel',{
	state:{
		label:{},
	},
	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('label');
		});
	},
	helpers:{
		label(){
			let label = Label.findOne({_id:Session.get('deleteLabelId')});
			this.state.label = label;
			return label;
		},
	},

	events:{
		'click .cancel'(){
			resetModalForm();
		},
		'click .delete-label-btn'(){
			Meteor.call('removeLabel',this.state.label._id,(err,result)=>{
				resetModalForm();
				if(!err){
				}
			});
		},
	}
});