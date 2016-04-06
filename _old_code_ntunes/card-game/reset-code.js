

      var myLibraries = "";
      var fileName;
      var originalCode;
      
      //load a script
      $(document).ready( function () {

        var searchString = window.location.search.substring(1);
        var variableArray = searchString.split('&');
        fileName = getUrlValue("fileName");

        if(fileName==undefined)
          fileName = "animation.js";

        $.ajax({
          type: "GET",
          url: fileName,
          dataType: "text",
          async: true,
          //success: handleData
          success: loadLibraries,
          error: loadLibrariesDefault
        });

      });//doc ready

      function getUrlValue(varSearch) {
        var searchString = window.location.search.substring(1);
        var variableArray = searchString.split('&');
        
        for(var i = 0; i < variableArray.length; i++){
          var keyValuePair = variableArray[i].split('=');
          console.log(keyValuePair);
          if(keyValuePair[0] == varSearch){
            return keyValuePair[1];
          }
        }
      }
      
      
      function loadLibrariesDefault() {
      editor.setValue("//file not found");
      }
      
      function loadLibraries(data) {
        originalCode = data;
        startMain();
        console.log("example loaded");
        editor.setValue(data, -1);

        $.ajax({
          type: "GET",
          url: "lib/p5.play.js",
          dataType: "text",
          async: true,
          success: handleData
          //success: loadLibraries,
        });

      }

      function handleData(data) {
        myLibraries = data;
        playEditor();
      }
      
      function reset() {
        editor.setValue(originalCode, -1);
        playEditor();
      }
      
      
      function run() {
        playEditor();
      }

    