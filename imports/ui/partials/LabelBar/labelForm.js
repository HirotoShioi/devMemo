import { TemplateController } from 'meteor/space:template-controller';

import './labelForm.html';
TemplateController('labelForm',{
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

	helpers:{
		labelColorsFirst(){
			return this.state.labelColorsFirst;
		},
		labelColorsSecond(){
			return this.state.labelColorsSecond;
		},
		selectedColor(){
			return this.state.selectedColor;
		},
	},
	events:{
		'click .fa-close'(){
			Session.set('labelFormShow',false);
		},
		'click .color-chooser-color'(event){
			const selectedColor = event.target.attributes.data.value;
			this.state.selectedColor = selectedColor;
		},
		'submit .new-label'(event){
		    // Prevent default browser form submit
		    event.preventDefault();

		    // Get value from form element
		    const target = event.target;
		    const labelName = target.label.value;

		    const colorRegExp = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
		    if(!colorRegExp.test(this.state.selectedColor)){
				Bert.alert("Invalid Color", 'danger', 'growl-top-right');
				return;
			}
				const labelObj = {
					label:labelName,
					color:this.state.selectedColor
				};
				Meteor.call('addLabel',labelObj,(err,result)=>{
				if(err){
					Bert.alert( err.reason, 'danger', 'growl-top-right');
				};
				if(!err){
				}
			});
			// Clear form
			target.label.value = '';
			this.state.selectedColor = "#e4e4e4";
			Session.set('labelFormShow', false);
		},
	}
});
