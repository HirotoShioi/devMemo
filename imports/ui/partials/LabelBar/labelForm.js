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
	}
});
