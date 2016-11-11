import { TemplateController } from 'meteor/space:template-controller';

import { Label } from '../../api/label.js';

import './BoardContent.html';
//partials
import '../partials/Memo.js';
import '../partials/List/List.js';

TemplateController('BoardContent',{
	onCreated(){
		this.autorun(()=>{
			this.subscribe('label');
		});
	},
	helpers:{
		editMode(){
			return Session.get("editMode") === this.data._id && this.data._id;
		},
	},
	events:{
		'click .toggle-label-option'(){
			if(Session.get("editMode") === this.data._id){
				Session.set("editMode",false);
			}else{
				Session.set("editMode",this.data._id);
			}
		},
	},
});
const hooksObject = {
	onSuccess:(formType,result)=>{
		Session.set('editMode',false);
	},
}

AutoForm.hooks({
  updateLabel: hooksObject
});