<html>

Javascript Sample page <br>

<script type="text/javascript" src="http://api.eventful.com/js/api">

</script>

<script type="text/javascript">

function show_alert()
{

  var oArgs = {
            app_key:"YOUR APP KEY",
            id: "20218701",
            page_size: 25 ,
  };

  EVDB.API.call("/events/get", oArgs, function(oData) {
      // Note: this relies on the custom toString() methods below
  });

}