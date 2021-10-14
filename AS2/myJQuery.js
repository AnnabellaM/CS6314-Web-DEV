$(document).ready(function() {
        var placeData = [];

        $.ajax({
          type: "GET",
          url:"data.json",
          dataType: "json",

          error: function() {
            alert("Errors occurred when loading data file.");
          },

          success: function(data) {
            placeData = data;
            var item = "<tr>";
            data.forEach((e, i) => {
              if (i % 4 == 3 || i == data.length - 1) {
                item += "<td><img class=\"image-spacing\" src=\"images/square/" + e.path + "\" alt=\"" + e.title + "\" id=\"" + e.id + "\"/></td></tr>";
                $("table").append(item);
                item = "";
              } else if (i % 4 == 0 && i > 0) {
                item += "<tr><td><img class=\"image-spacing\" src=\"images/square/" + e.path + "\" alt=\"" + e.title + "\" id=\"" + e.id + "\"/></td>";
              } else {
                item += "<td><img class=\"image-spacing\" src=\"images/square/" + e.path + "\" alt=\"" + e.title + "\" id=\"" + e.id + "\"/></td>";
              }
            });
          }
        })

        $("table").on("mouseenter", "td", function(e) {
          if ($(this).find("img").hasClass("gray") == false) {
            $(this).find("img").addClass("gray");
            var id = $(this).find("img").attr("id");
            var result = $.grep(placeData, function(e) { return e.id == id });
            var left = e.pageX - 850;
            var top = e.pageY - 80;
            $("#myModal").css({top: top, left: left, position: 'absolute'});
            $("#myModal").find("img").attr("src", "images/medium/" + result[0].path);
            $("#myModal").find("p").text(result[0].title + " " + result[0].city + " " + result[0].taken);
            $("#myModal").show();
          }
        })

        $("table").on("mouseleave", "td", function() {
          if ($(this).find("img").hasClass("gray")) {
            $(this).find("img").removeClass("gray");
            $("#myModal").hide();
          }
        })

        $("table").on("mousemove", "td", function(e) {
          var left = e.pageX - 850;
          var top = e.pageY - 80;
          $("#myModal").css({top: top, left: left, position: 'absolute'});
          $("#myModal").show();
        })
      })