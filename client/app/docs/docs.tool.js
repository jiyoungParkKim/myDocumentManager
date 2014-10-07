var app= angular.module('myDocumentManagerApp');
app.service('tools', function(){

	this.init = function($scope, _editor, _htmlViewer){
		$scope.ACE_EDITOR = {
			viewer:_editor,
			setValue:function(content){
				_editor.setValue(content);
			},
			getValue:function(){
				return _editor.getValue();
			}
		};

		$scope.HTML_VIEWER = {
			viewer:_htmlViewer,
			setValue:function(content){
				_htmlViewer.innerHTML = cvrtEditorToHtmlViewer(content);
			},
			getValue:function(){
				return _htmlViewer.innerHTML;
			}
		};

		$scope.tagsWithClass = tagsWithClass;
		$scope.tagsWithoutClass = tagsWithoutClass;	
		$scope.symbols = symbols;	
		$scope.colors = colors;	
		$scope.htmlTags = htmlTags;

		console.log($scope.ACE_EDITOR)
		console.log($scope.HTML_VIEWER)
	};


	this.changeCurrentEditor = function($scope){
		
		if(!$scope.isEditorOn){
			$scope.HTML_VIEWER.setValue($scope.ACE_EDITOR.getValue());
		}
		
	};

	this.reset = function($scope){
		$scope.ACE_EDITOR.setValue($scope.content);
		$scope.HTML_VIEWER.setValue($scope.content);
	}

	function cvrtEditorToHtmlViewer(content){
		return content
	    	.replace(/[\n\r]/g, '<br>')
	    	.replace(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;')
	    	.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
	};


/////// tags ///////////////////

function getSelectedTxt(){
	var txt;
	if (window.getSelection){
	    txt = window.getSelection();
	}
	else if (document.getSelection){
	    txt = document.getSelection();
	}
	else if (document.selection){
	    txt = document.selection.createRange().text;
	}
	return txt;
}

this.addTagsWithoutClass = function($scope, tag){
	if($scope.isEditorOn){
		var editor = $scope.ACE_EDITOR.viewer;
		var txt = editor.getCopyText();
		if(txt == ""){
			editor.insert(tag.left + tag.right);
		}else{
			editor.find(txt, {range:editor.getSelectionRange()});
			editor.replace(tag.left + txt + tag.right);
		}
	}else{
		// TODO replacement within the range of a selected text
		var txt = getSelectedTxt();
		if(txt != ""){
		    var orignalstring = $scope.ACE_EDITOR.getValue();
		    var tmp = tag.left + txt + tag.right;
			var newstring = orignalstring.replace(txt, tmp);
			$scope.ACE_EDITOR.setValue(newstring);
			$scope.HTML_VIEWER.setValue(newstring);
		}
	}	
}

this.addTagsWithClass = function($scope, tag, className){
	if($scope.isEditorOn){
		var editor = $scope.ACE_EDITOR.viewer;
		var txt = editor.getCopyText();
		if(txt == ""){
			editor.insert(tag.left(className) + tag.right);
		}else{
			editor.find(txt, {range:editor.getSelectionRange()});
			editor.replace(tag.left(className) + txt + tag.right);
		}
	}else{
		// TODO replacement within the range of a selected text
		var txt = getSelectedTxt();
		if(txt != ""){
		    var orignalstring = $scope.ACE_EDITOR.getValue();
		    var tmp = tag.left(className) + txt + tag.right;
			var newstring = orignalstring.replace(txt, tmp);
			$scope.ACE_EDITOR.setValue(newstring);
			$scope.HTML_VIEWER.setValue(newstring);
		}
	}	
};

// this.reset = function(){
// 	_editor.setValue(_orignalstring);
// 	if(_scope.currentViewer == _scope.HTML_VIEWER){
// 		_htmlViewer.innerHTML = cvtEditorToHtmlViewer(_orignalstring);
// 	}
// };


var tagsWithClass = [
    {name:"mark",       left:function(className){return '<mark class=\"_'+className+'\">'}, right:"</mark>"},
    {name:"block",      left:function(className){return '<div class=\"box _'+className+'\">'}, right:"</div>"},
];

var tagsWithoutClass = [
    {name:"code",       left:"<code>", right:"</code>"},
    {name:"comment",    left:"<comment>", right:"</comment>"},
    {name:"pre",        left:"<pre>", right:"</pre>"},
    {name:"bold",       left:"<strong>", right:"</strong>"},
    {name:"<>",       left:"&lt;", right:"&gt;"}
];

var symbols = [
	{value:"→"},
	{value:"←"},
	{value:"⇒"},  
	{value:"⇐"}, 
	{value:"∗"}, 
	{value:"•"}, 
	{value:"⋅"},
	{value:"ο"}
];

var htmlTags = [
	{tag:"img", value:"<img src=\"assets/images/docs/\"  width=\"550\">"},
	{tag:"link", value:"<a href=\"\" target=\"_blank\"></a>"}
];

/////// colors //////////////////

var colors = [
	{name:'AliceBlue', color:'#F0F8FF',favorate:true},
	{name:'AntiqueWhite', color:'#FAEBD7',favorate:false},
	{name:'Aqua', color:'#00FFFF',favorate:true},
	{name:'Aquamarine', color:'#7FFFD4',favorate:false},
	{name:'Azure', color:'#F0FFFF',favorate:true},
	{name:'Beige', color:'#F5F5DC',favorate:false},
	{name:'Bisque', color:'#FFE4C4',favorate:false},
	{name:'Black', color:'#000000',favorate:false},
	{name:'BlanchedAlmond', color:'#FFEBCD',favorate:false},
	{name:'Blue', color:'#0000FF',favorate:false},
	{name:'BlueViolet', color:'#8A2BE2',favorate:false},
	{name:'Brown', color:'#A52A2A',favorate:false},
	{name:'BurlyWood', color:'#DEB887',favorate:false},
	{name:'CadetBlue', color:'#5F9EA0',favorate:false},
	{name:'Chartreuse', color:'#7FFF00',favorate:false},
	{name:'Chocolate', color:'#D2691E',favorate:false},
	{name:'Coral', color:'#FF7F50',favorate:true},
	{name:'CornflowerBlue', color:'#6495ED',favorate:false},
	{name:'Cornsilk', color:'#FFF8DC',favorate:false},
	{name:'Crimson', color:'#DC143C',favorate:false},
	{name:'Cyan', color:'#00FFFF',favorate:false},
	{name:'DarkBlue', color:'#00008B',favorate:false},
	{name:'DarkCyan', color:'#008B8B',favorate:false},
	{name:'DarkGoldenRod', color:'#B8860B',favorate:false},
	{name:'DarkGray', color:'#A9A9A9',favorate:false},
	{name:'DarkGreen', color:'#006400',favorate:false},
	{name:'DarkKhaki', color:'#BDB76B',favorate:false},
	{name:'DarkMagenta', color:'#8B008B',favorate:false},
	{name:'DarkOliveGreen', color:'#556B2F',favorate:false},
	{name:'DarkOrange', color:'#FF8C00',favorate:false},
	{name:'DarkOrchid', color:'#9932CC',favorate:false},
	{name:'DarkRed', color:'#8B0000',favorate:false},
	{name:'DarkSalmon', color:'#E9967A',favorate:true},
	{name:'DarkSeaGreen', color:'#8FBC8F',favorate:false},
	{name:'DarkSlateBlue', color:'#483D8B',favorate:false},
	{name:'DarkSlateGray', color:'#2F4F4F',favorate:true},
	{name:'DarkTurquoise', color:'#00CED1',favorate:false},
	{name:'DarkViolet', color:'#9400D3',favorate:false},
	{name:'DeepPink', color:'#FF1493',favorate:false},
	{name:'DeepSkyBlue', color:'#00BFFF',favorate:false},
	{name:'DimGray', color:'#696969',favorate:false},
	{name:'DodgerBlue', color:'#1E90FF',favorate:false},
	{name:'FireBrick', color:'#B22222',favorate:false},
	{name:'FloralWhite', color:'#FFFAF0',favorate:false},
	{name:'ForestGreen', color:'#228B22',favorate:false},
	{name:'Fuchsia', color:'#FF00FF',favorate:false},
	{name:'Gainsboro', color:'#DCDCDC',favorate:false},
	{name:'GhostWhite', color:'#F8F8FF',favorate:false},
	{name:'Gold', color:'#FFD700',favorate:false},
	{name:'GoldenRod', color:'#DAA520',favorate:false},
	{name:'Gray', color:'#808080',favorate:false},
	{name:'Green', color:'#008000',favorate:false},
	{name:'GreenYellow', color:'#ADFF2F',favorate:true},
	{name:'HoneyDew', color:'#F0FFF0',favorate:false},
	{name:'HotPink', color:'#FF69B4',favorate:false},
	{name:'IndianRed', color:'#CD5C5C',favorate:false},
	{name:'Indigo', color:'#4B0082',favorate:false},
	{name:'Ivory', color:'#FFFFF0',favorate:false},
	{name:'Khaki', color:'#F0E68C',favorate:false},
	{name:'Lavender', color:'#E6E6FA',favorate:false},
	{name:'LavenderBlush', color:'#FFF0F5',favorate:false},
	{name:'LawnGreen', color:'#7CFC00',favorate:false},
	{name:'LemonChiffon', color:'#FFFACD',favorate:false},
	{name:'LightBlue', color:'#ADD8E6',favorate:false},
	{name:'LightCoral', color:'#F08080',favorate:false},
	{name:'LightCyan', color:'#E0FFFF',favorate:false},
	{name:'LightGoldenRodYellow', color:'#FAFAD2',favorate:true},
	{name:'LightGray', color:'#D3D3D3',favorate:false},
	{name:'LightGreen', color:'#90EE90',favorate:false},
	{name:'LightPink', color:'#FFB6C1',favorate:true},
	{name:'LightSalmon', color:'#FFA07A',favorate:false},
	{name:'LightSeaGreen', color:'#20B2AA',favorate:false},
	{name:'LightSkyBlue', color:'#87CEFA',favorate:false},
	{name:'LightSlateGray', color:'#778899',favorate:false},
	{name:'LightSteelBlue', color:'#B0C4DE',favorate:false},
	{name:'LightYellow', color:'#FFFFE0',favorate:false},
	{name:'Lime', color:'#00FF00',favorate:false},
	{name:'LimeGreen', color:'#32CD32',favorate:false},
	{name:'Linen', color:'#FAF0E6',favorate:false},
	{name:'Magenta', color:'#FF00FF',favorate:false},
	{name:'Maroon', color:'#800000',favorate:false},
	{name:'MediumAquaMarine', color:'#66CDAA',favorate:true},
	{name:'MediumBlue', color:'#0000CD',favorate:false},
	{name:'MediumOrchid', color:'#BA55D3',favorate:false},
	{name:'MediumPurple', color:'#9370DB',favorate:false},
	{name:'MediumSeaGreen', color:'#3CB371',favorate:false},
	{name:'MediumSlateBlue', color:'#7B68EE',favorate:false},
	{name:'MediumSpringGreen', color:'#00FA9A',favorate:false},
	{name:'MediumTurquoise', color:'#48D1CC',favorate:false},
	{name:'MediumVioletRed', color:'#C71585',favorate:false},
	{name:'MidnightBlue', color:'#191970',favorate:false},
	{name:'MintCream', color:'#F5FFFA',favorate:false},
	{name:'MistyRose', color:'#FFE4E1',favorate:true},
	{name:'Moccasin', color:'#FFE4B5',favorate:false},
	{name:'NavajoWhite', color:'#FFDEAD',favorate:false},
	{name:'Navy', color:'#000080',favorate:false},
	{name:'OldLace', color:'#FDF5E6',favorate:false},
	{name:'Olive', color:'#808000',favorate:false},
	{name:'OliveDrab', color:'#6B8E23',favorate:false},
	{name:'Orange', color:'#FFA500',favorate:false},
	{name:'OrangeRed', color:'#FF4500',favorate:false},
	{name:'Orchid', color:'#DA70D6',favorate:false},
	{name:'PaleGoldenRod', color:'#EEE8AA',favorate:false},
	{name:'PaleGreen', color:'#98FB98',favorate:true},
	{name:'PaleTurquoise', color:'#AFEEEE',favorate:false},
	{name:'PaleVioletRed', color:'#DB7093',favorate:false},
	{name:'PapayaWhip', color:'#FFEFD5',favorate:false},
	{name:'PeachPuff', color:'#FFDAB9',favorate:false},
	{name:'Peru', color:'#CD853F',favorate:false},
	{name:'Pink', color:'#FFC0CB',favorate:false},
	{name:'Plum', color:'#DDA0DD',favorate:true},
	{name:'PowderBlue', color:'#B0E0E6',favorate:true},
	{name:'Purple', color:'#800080',favorate:false},
	{name:'Red', color:'#FF0000',favorate:false},
	{name:'RosyBrown', color:'#BC8F8F',favorate:false},
	{name:'RoyalBlue', color:'#4169E1',favorate:false},
	{name:'SaddleBrown', color:'#8B4513',favorate:false},
	{name:'Salmon', color:'#FA8072',favorate:false},
	{name:'SandyBrown', color:'#F4A460',favorate:false},
	{name:'SeaGreen', color:'#2E8B57',favorate:false},
	{name:'SeaShell', color:'#FFF5EE',favorate:false},
	{name:'Sienna', color:'#A0522D',favorate:false},
	{name:'Silver', color:'#C0C0C0',favorate:false},
	{name:'SkyBlue', color:'#87CEEB',favorate:false},
	{name:'SlateBlue', color:'#6A5ACD',favorate:false},
	{name:'SlateGray', color:'#708090',favorate:false},
	{name:'Snow', color:'#FFFAFA',favorate:false},
	{name:'SpringGreen', color:'#00FF7F',favorate:false},
	{name:'SteelBlue', color:'#4682B4',favorate:false},
	{name:'Tan', color:'#D2B48C',favorate:false},
	{name:'Teal', color:'#008080',favorate:false},
	{name:'Thistle', color:'#D8BFD8',favorate:false},
	{name:'Tomato', color:'#FF6347',favorate:false},
	{name:'Turquoise', color:'#40E0D0',favorate:false},
	{name:'Violet', color:'#EE82EE',favorate:true},
	{name:'Wheat', color:'#F5DEB3',favorate:false},
	{name:'White', color:'#FFFFFF',favorate:false},
	{name:'WhiteSmoke', color:'#F5F5F5',favorate:false},
	{name:'Yellow', color:'#FFFF00',favorate:true},
	{name:'YellowGreen', color:'#9ACD32',favorate:false},
];

});