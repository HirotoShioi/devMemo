import { TemplateController } from 'meteor/space:template-controller';
import { resetModalForm } from './modalHelper.js';
import './AddLabelForm.html';

TemplateController('AddLabelForm',{
	state:{
		selectedColor:"#e4e4e4",
		labelColorsFirst:[
			{value:"#ff5252"},
			{value:"#ff4081"},
			{value:"#e040fb"},
			{value:"#b388ff"},
			{value:"#8c9eff"},
		],
		labelColorsSecond:[
			{value:"#40c4ff"},
			{value:"#18ffff"},
			{value:"#64ffda"},
			{value:"#69f0ae"},
			{value:"#b2ff59"},
		],
	},
	onRendered(){
		Session.set('addLabelSelectedColor', "#e4e4e4");
	},
	helpers:{
		labelColorsFirst(){
			return this.state.labelColorsFirst;
		},
		labelColorsSecond(){
			return this.state.labelColorsSecond;
		},
		selectedColor(){
			return Session.get('addLabelSelectedColor');
		},
		schema(){
			const schema = new SimpleSchema({
				name:{
					type:String,
					label:"Name",
					max:10,
				},
			});
			return schema;
		},
	},
	events:{
		'click .fa-close'(){
			Session.set('labelFormShow',false);
		},
		'click .color-chooser-color'(event){
			const selectedColor = event.target.attributes.data.value;
			Session.set('addLabelSelectedColor', selectedColor);
		},
	}
});
const hooksObject = {
	onSubmit: function(insertDoc, updateDoc, currentDoc) {
	this.event.preventDefault();
	let labelColor = Session.get('addLabelSelectedColor');
	let labelDoc = {
		name:insertDoc.name,
		color:labelColor,
	};
	Session.set('isLoadingModal',true);
	Session.set('showModal',false);
	Meteor.call('addLabel',labelDoc,(err,result)=>{
		if(!err){
			Session.set('isLoadingModal', false);
			resetModalForm();
			this.resetForm();
		}
	});
	this.done();
	},
}
AutoForm.hooks({
  addLabel: hooksObject
});
