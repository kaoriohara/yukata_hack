/*global $, google */
window.onload = function() {
  /*
  $.ajax('/event/', {
    method: 'GET',
    dataType: 'json'
  }).done(function(locations) {
    showMap(locations);
  }).fail(function() {
    alert('データの取得に失敗しました');
  });
  */
  var locations = [
    { y: 35.681735, x: 139.762651 },
    { y: 35.681622, x: 139.766073 },
    { y: 35.682622, x: 139.766373 },
  ];
  showMap(locations);
};

function showMap(locations) {
  var defaultPos = new google.maps.LatLng(35.681735, 139.762651);
  var icon = new google.maps.MarkerImage('img/ico.png',
    new google.maps.Size(55, 72), // サイズ
    new google.maps.Point(0, 0)   // 位置
  );
  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 15,
    center: defaultPos,
    mapTypeControlOptions: { mapTypeIds: ['sample', google.maps.MapTypeId.ROADMAP] }/*表示タイプの指定*/
  });

  locations.forEach(function(location) {
    var pos = new google.maps.LatLng(location.y, location.x);
    var title = 'チャットのタイトル';
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: icon,
      title: title,
    });
    new google.maps.InfoWindow({
      content: title
    }).open(map, marker);

    google.maps.event.addListener(marker, 'click', function(e) {
      openChat(e.latLng.G, e.latLng.K);
    });
  });
}

function openChat(x, y) {
  alert('open chat: ' + x + ', ' + y);
}