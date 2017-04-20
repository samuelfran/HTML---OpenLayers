var qualquerNome = (function()
	{
		var Edit = function(){};
		Edit.prototype = 
		{
//----------------------------LISTENERS DO MAPA-----------------------
			onMove : function(e){
				var position = this.events.getMousePosition(e);                                                     //detecta posição do mouse 
				var lonlat = map.getLonLatFromPixel(position);                                                      //pega latitude e longitude dos pixels em relacao ao mouse
				if(lonlat!=undefined || lonlat!=null){
					var point = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);                               //criando ponto pegando lat e long do mouse 
					//editor.callAllObservers(editor.onMoveObserver,point);
					samu1.rubber(point);
				}
			},
			
			onClick : function(e){
				switch(e.button) 
				{
					case 0:
						   //editor.onLeftClick(this.events.getMousePosition(e));
							var position = this.events.getMousePosition(e);                                                     //detecta posição do mouse 
							var lonlat = map.getLonLatFromPixel(position);                                                      //pega latitude e longitude dos pixels em relacao ao mouse
							if(lonlat!=undefined || lonlat!=null){                                                              //verifica se a variavell lonlat esta nula ou indefinida
								var point = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);                               //define variavel ponto que recebe uma geometria ponto com lat e long do OpenLayers 
								samu1.addPointLine(point);                                                                      //a funcao addPointLine recebe a variavel ponto
							}
						
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
				  'strokeColor': '#d5e861',                                                                                      //cor das bordas ou linha
				  'fillOpacity' : 0.4,                                                                                           //opacidade da cor de fundo
				  'fillColor': "#d5e861",                                                                                        //cor de fundo
				  'pointRadius': 7                                                                                               //caso editing Layer for um ponto, tem que ter esse campo, para tratalo de forma correta
                }})}),
			savedLayer : new OpenLayers.Layer.Vector('Glue EditingLayer',{ styleMap: new OpenLayers.StyleMap({'default':{
                  'strokeWidth': 2,                                                                                              //espessura da linha ou borda
				  'strokeColor': '#1bf760',                                                                                  //cor das bordas ou linha
				  'fillOpacity' : 0.4,                                                                                           //opacidade da cor de fundo
				  'fillColor': "#1bf760",                                                                                        //cor de fundo
				  'pointRadius': 7                                                                                               //caso editing Layer for um ponto, tem que ter esse campo, para tratalo de forma correta
                }})}),
				
				line: new OpenLayers.Geometry.LineString([]),
			
//-----------------------------------FUNÇOES-------------------------		
			desenha : function(e){
				alert("opa");
			},		
			
			addPointLine : function(positionMouse){
				samu1.line.components[samu1.line.components.length]=positionMouse;  //add um ponto novo dentro do line 
				
				var f = new OpenLayers.Feature.Vector(samu1.line);                  // cria variavel feature e add a limha 
				samu1.editingLayer.addFeatures([f]);                                //add a feature dentro do layer 
				map.addLayers([samu1.editingLayer]);                                //add o layer no mapa
				
				//samu1.line.components[samu1.line.components.length]=positionMouse;
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
			}
			
			};
		return Edit;
	})();
	
var samu1= new qualquerNome();
