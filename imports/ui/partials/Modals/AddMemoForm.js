import { TemplateController } from 'meteor/space:template-controller';
import { resetModalForm }from './modalHelper.js';
import './AddMemoForm.html';
import { Label } from '../../../api/label.js';
TemplateController('AddMemoForm',{
	state:{
		selectedLabelId:''
	},
	onCreated(){
		this.autorun(()=>{
			this.subscribe('label');
		});
	},

	helpers:{
		selectedLabelId(){
			return this.state.selectedLabelId;
		},
		labels(){
			let labels = Label.find({},{limit:10, sort:{createdAt: -1}});
			this.state.selectedLabelId =  labels.fetch()[0]._id;
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
			this.state.selectedLabelId =  selectedLabelId;
			Session.set('addMemoSelectedLabelId', this.state.selectedLabelId);
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
	this.resetForm();
	Session.set('isLoadingMemo',true);
	Session.set('showModal',false);
	Meteor.call('addMemo',memoDoc,(err,result)=>{
		Session.set('isLoadingMemo', false);
		if(!err){
			resetModalForm();
		}
	});
	this.done();
	},
}
AutoForm.hooks({
  addMemo: hooksObject
});
