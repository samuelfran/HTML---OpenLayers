var qualquerNome = (function()
	{
		var Edit = function(){};
		Edit.prototype = 
		{
				
//---------------------------VARIAVEIS-----------------------
				
				onLeftClickObservers : [],
				
				onRigthClickObservers : [],

				
				editingPoint: new OpenLayers.Geometry.Point([]),
				
//----------------------------LISTENERS DO MAPA-----------------------
			onMove : function(e){
				var position = this.events.getMousePosition(e);                                          //detecta posição do mouse 
				var lonlat = map.getLonLatFromPixel(position);                                           //pega latitude e longitude dos pixels em relacao ao mouse
				if(lonlat!=undefined || lonlat!=null){
					var point = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);                    //criando ponto pegando lat e long do mouse 
					//samu1.callAllObservers(samu1.onMoveObserver,point);
					samu1.rubber(point);
				}
			},
			
			onClick : function(e){
				switch(e.button) 
				{
					case 0:
						   samu1.onLeftClick(this.events.getMousePosition(e));
							//var position = this.events.getMousePosition(e);                           //detecta posição do mouse 
							//var lonlat = map.getLonLatFromPixel(position);                            //pega latitude e longitude dos pixels em relacao ao mouse
							//if(lonlat!=undefined || lonlat!=null){                                    //verifica se a variavell lonlat esta nula ou indefinida
								//var point = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);     //define variavel ponto que recebe uma geometria ponto com lat e long do OpenLayers 
								//samu1.addPointLine(point);              							  //a funcao addPointLine recebe a variavel ponto
								//samu1.callAllObservers(samu1.onLeftClickObservers,point);
							//}
						
						break;
					case 2:
						//editor.onRightClick(e);
						samu1.save();
						break;
					default:
						break;
				}   
			},
			
			onPresedKey : function(e){
				//editor.recieveKeyCode(e);
			},
//-----------------------------------VARIAVEIS-----------------------

			editingLayer : new OpenLayers.Layer.Vector('Glue EditingLayer',{ styleMap: new OpenLayers.StyleMap({'default':{
                  'strokeWidth': 2,                                                                                              //espessura da linha ou borda
				  'strokeColor': '#6959CD',                                                                                      //cor das bordas ou linha
				  'fillOpacity' : 0.4,                                                                                           //opacidade da cor de fundo
				  'fillColor': "#6959CD",                                                                                        //cor de fundo
				  'pointRadius': 7                                                                                               //caso editing Layer for um ponto, tem que ter esse campo, para tratalo de forma correta
                }})}),
			savedLayer : new OpenLayers.Layer.Vector('Glue EditingLayer',{ styleMap: new OpenLayers.StyleMap({'default':{
                  'strokeWidth': 2,                         //espessura da linha ou borda
				  'strokeColor': '#1bf760',                 //cor das bordas ou linha
				  'fillOpacity' : 0.4,                      //opacidade da cor de fundo
				  'fillColor': "#1bf760",                   //cor de fundo
				  'pointRadius': 7                          //caso editing Layer for um ponto, tem que ter esse campo, para tratalo de forma correta
                }})}),
				
				line: new OpenLayers.Geometry.LineString([]),
			
//-----------------------------------FUNÇOES-------------------------		
			
			selectForm : function(element)
			{
				samu1.setObservers(element.value)},
			
			setObservers : function(tool){
				switch(tool) 
				{
					case "point":
					samu1.attach(samu1.onLeftClickObservers,samu1.drawPoint);
						break;
					case "line":
					samu1.attach(samu1.onLeftClickObservers,samu1.addPointLine);
						break;
					case "none":
					alert("NONE")
				}
			
			},
			
			onLeftClick : function(e){
				var position = e;
				samu1.lonlat = map.getLonLatFromPixel(position);
				if(samu1.lonlat!=undefined || samu1.lonlat!=null){
					var point = new OpenLayers.Geometry.Point(samu1.lonlat.lon,samu1.lonlat.lat);
					samu1.callAllObservers(samu1.onLeftClickObservers,point);	
				}
			},
			
			onRightClick : function (e){
				var position = e;
				editor.lonlat = map.getLonLatFromPixel(position);
				if(editor.lonlat!=undefined || editor.lonlat!=null){
					var point = new OpenLayers.Geometry.Point(editor.lonlat.lon,editor.lonlat.lat);
					editor.callAllObservers(editor.onRigthClickObservers,point);
				}
			},
			
			clean : function(observerArray){
				while (observerArray.length > 0)
				{
					observerArray.pop();
				}
			},
			
			callAllObservers : function(arrayObservers,point){
				for(var x=0;x<arrayObservers.length;x++)
				{
					arrayObservers[x](point);
				}
			},
			
			attach : function(observerArray,observer){
				observerArray.push(observer);},
			
			addPointLine : function(positionMouse, e){ 
				samu1.line.components[samu1.line.components.length]=positionMouse;
				samu1.drawPoint(positionMouse); 
				for(var x=0;x<samu1.savedLayer.features.length;x++){
					if(samu1.savedLayer.features.length!=0 && samu1.savedLayer.features[x].geometry.CLASS_NAME==="OpenLayers.Geometry.Point"){
						if(samu1.savedLayer.features[x].geometry.x == positionMouse.x && samu1.savedLayer.features[x].geometry.y===positionMouse.y){
							samu1.savedLayer.destroyFeatures(samu1.savedLayer.features[x]);
						}
						else{
							//samu1.savedLayer.destroyFeatures(samu1.savedLayer.features[x]);
							samu1.drawPoint(positionMouse);
						}
					}
				}						
				var f = new OpenLayers.Feature.Vector(samu1.line);          		//cria variavel feature e add uma limha
				samu1.editingLayer.addFeatures([f]);                              //add a feature dentro do layer 
				map.addLayers([samu1.editingLayer]);                              //add o layer no mapa
				//samu1.line.components[samu1.line.components.length]=positionMouse;
				
				
			},
			
			drawPoint : function(point){
				samu1.editingPoint=point;
				samu1.show(samu1.editingLayer,samu1.editingPoint);
				//editor.savedLayer.addFeatures(editor.editingLayer);
				samu1.savedLayer.addFeatures(new OpenLayers.Feature.Vector(samu1.editingPoint))
				map.addLayers([samu1.savedLayer]);
			},
			
			rubber : function(positionMouse){
				if(samu1.line.components.lenght !=0){
				samu1.line.components[samu1.line.components.length-1]=positionMouse;   //a ultima posicao do vetor(da reta) é onde o mouse está
				var f = new OpenLayers.Feature.Vector(samu1.line);
				
				samu1.editingLayer.addFeatures([f]);
				map.addLayers([samu1.editingLayer]);
				}
			},
			
			save : function (){
				var f = new OpenLayers.Feature.Vector(samu1.line);
				samu1.savedLayer.addFeatures([f]);
				map.addLayer(samu1.savedLayer);
				samu1.line = new OpenLayers.Geometry.LineString([]);
				var f2 =new OpenLayers.Feature.Vector(samu1.line)
				samu1.editingLayer.addFeatures([f2]);
				map.addLayer(samu1.editingLayer);
			},
			
			show : function(layer,geometry){
				var f = new OpenLayers.Feature.Vector(geometry);
				if (layer.features.length >0){
					layer.destroyFeatures();
				}
				layer.addFeatures([f]);
				map.addLayers([layer]);
			},
			
			};
		return Edit;
	})();
	
var samu1= new qualquerNome();
