import { TemplateController } from 'meteor/space:template-controller';
import { resetModalForm }from './modalHelper.js';
import './AddMemoForm.html';
import '../../partials/Loading.js';
import { Label } from '../../../api/label.js';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

TemplateController('AddMemoForm',{
	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('label');
		});
	},

	helpers:{
		isLoading(){
			return Session.get('isLoadingModal');
		},
		selectedLabelId(){
			return Session.get('addMemoSelectedLabelId');
		},
		labels(){
			let labels = Label.find({},{limit:10, sort:{createdAt: -1}});
			return labels;
		},
		schema(){
			const schema = new SimpleSchema({
				url:{
					type:String,
					label:"URL",
					regEx:SimpleSchema.RegEx.Url
				},
			});
			return schema;
		},
	},

	events:{
		'click .label-select'(event){
			const selectedLabelId = event.target.attributes.data.value;
			Session.set('addMemoSelectedLabelId', selectedLabelId);
		},
	}
});
const hooksObject = {
	onSubmit: function(insertDoc, updateDoc, currentDoc) {
	this.event.preventDefault();
	let labelId = Session.get('addMemoSelectedLabelId');
	let memoDoc = {
		url:insertDoc.url,
		labelId:labelId
	};
	Session.set('isLoadingModal',true);
	Session.set('showModal',false);
	Meteor.call('addMemo',memoDoc,(err,result)=>{
		Session.set('isLoadingModal', false);
		resetModalForm();
		this.resetForm();
		if(err){
			Bert.alert({
				type:"danger",
				message:err.reason,
				style:"growl-top-right"
			});
		}
		if(!err){
			Bert.alert({
				type:"success",
				message:"Memo Added",
				style:"growl-top-right"
			});
		}
	});
	this.done();
	},
}
AutoForm.hooks({
  addMemo: hooksObject
});
