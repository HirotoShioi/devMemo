import { TemplateController } from 'meteor/space:template-controller';
import './BoardForm.html';
import { Label } from '../../api/label.js';

TemplateController('BoardForm',{
	state:{
		shouldColorPaletteShow:false,
		selectedColor:"#e4e4e4",
		labelColorsFirst:[
			{value:"#ff5252"},
			{value:"#ff4081"},
			{value:"#e040fb"},
			{value:"#b388ff"},
			{value:"#8c9eff"},
			{value:"#82b1ff"},
			{value:"#40c4ff"},
		],
		labelColorsSecond:[
			{value:"#40c4ff"},
			{value:"#18ffff"},
			{value:"#64ffda"},
			{value:"#69f0ae"},
			{value:"#b2ff59"},
			{value:"#eeff41"},
			{value:"#ffd740"},
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
		shouldColorPaletteShow(){
			return this.state.shouldColorPaletteShow;
		}
	},

	events:{
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
		    		Bert.alert( 'Label Added', 'info', 'growl-top-right' );
		    	}
		    });
		    
		    // Clear form
	    	target.label.value = '';
	    	this.state.selectedColor = "#e4e4e4";
		},
		'click .color-chooser-color'(event){
			const selectedColor = event.target.attributes.data.value;
			this.state.selectedColor = selectedColor;
			this.state.shouldColorPaletteShow = false;
		},
		'click .color-btn'(){
			this.state.shouldColorPaletteShow = true;
		},
		'keyup [name="color"]'(event){
			let value = event.target.value.trim();
			this.state.selectedColor = value;
		},
	}
});