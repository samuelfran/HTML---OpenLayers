function glueMap(name)
{

//-----------------------VAREAVEIS DE OBJETOS OPENLAYERS GLOBAIS ----------------------------------------------------		
		
		var mercator = new OpenLayers.Projection("EPSG:3857");
		window.map = new OpenLayers.Map(name,{
		  projection: mercator,
		  allOverlays: true,
		  displayProjection: "EPSG:4326",
		  numZoomLevels: 24,
		  tileManager: new OpenLayers.TileManager({
		   cacheSize:2048
		  })});
		window.ortofoto1 = new OpenLayers.Layer.XYZ(
       "Imagem Ortofoto 2014",
       ["http://geopx.mine.nu:8888/glue-saosebastiao-fotos/Maps/saosebastiao/${z}/${x}/${y}.png"],{
         //visibility:true,
         resolutions: [
         156543.03390625,
         78271.516953125,
         39135.7584765625,
         19567.87923828125,
         9783.939619140625,
         4891.9698095703125,
         2445.9849047851562,
         1222.9924523925781,
         611.4962261962891,
         305.74811309814453,
         152.87405654907226,
         76.43702827453613,
         38.218514137268066,
         19.109257068634033,
         9.554628534317017,
         4.777314267158508,
         2.388657133579254,
         1.194328566789627,
         0.5971642833948135,
         0.29858214169740677,
         0.14929107084870338,
         0.07464553542435169,
         0.037322767712175846,
         0.018661383856087923
                       ],
         serverResolutions: [
         156543.03390625,
         78271.516953125,
         39135.7584765625,
         19567.87923828125,
         9783.939619140625,
         4891.9698095703125,
         2445.9849047851562,
         1222.9924523925781,
         611.4962261962891,
         305.74811309814453,
         152.87405654907226,
         76.43702827453613,
		 38.218514137268066,
         19.109257068634033,
         9.554628534317017,
         4.777314267158508,
         2.388657133579254,
         1.194328566789627,
         0.5971642833948135,
         0.29858214169740677,
         0.14929107084870338
         ],
       transitionEffect: 'resize'
           },
		   {isBaseLayer: true}
    );
		
		//map.events.register("mousemove", map, editor.onMove);//   MOUSE MOVE LISTENING EVEN OVER MAP
		//map.events.register("click", map,editor.onClick);//	MOUSE CLICK LISTENING EVEN OVER MAP
		//document.body.onkeydown = editor.onPresedKey; 	// KEYS LISTENING EVENT OVER PAGE
	//	map.div.oncontextmenu = editor.onClick;
	
	map.events.register("mousemove", map, samu1.onMove);//   MOUSE MOVE LISTENING EVEN OVER MAP
		map.events.register("click", map,samu1.onClick);//	MOUSE CLICK LISTENING EVEN OVER MAP
		document.body.onkeydown = samu1.onPresedKey; 	// KEYS LISTENING EVENT OVER PAGE
		map.div.oncontextmenu = samu1.onClick;
		
//------------------LAYERS E CONTROLADORES ADD AO MAPA------------------		
	
		map.addLayers([ortofoto1]);
		map.addControl(new OpenLayers.Control.LayerSwitcher());
		map.setCenter( new OpenLayers.LonLat(-5305971, -2599250),17);
		var lonlat1 = new OpenLayers.LonLat(-5054943.492160067,-2725365.191374408);
		map.setCenter(lonlat1, 20);
		
		return(map);		
}
