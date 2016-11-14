import { TemplateController } from 'meteor/space:template-controller';
import { rwindow } from 'meteor/gadicohen:reactive-window';
import './Overlay.html';

TemplateController('Overlay',{
	helpers:{
		shouldOverlayShow(){
			if(rwindow.outerWidth() >= 992 && Session.get('isShrinkedSideNavShown') == true){
				Session.set('isShrinkedSideNavShown',false);
			}
			return Session.get('isShrinkedSideNavShown');
		},
	},
	events:{
		'click .overlay-show'(){
			Session.set('isShrinkedSideNavShown',false);
		},
	},
});