/*global $, google */
window.onload = function() {
  var defaultPos = new google.maps.LatLng(35.681735, 139.762651);
  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 12,
    center: defaultPos,
    mapTypeControlOptions: { mapTypeIds: ['sample', google.maps.MapTypeId.ROADMAP] }/*表示タイプの指定*/
  });

  var putMarker = function(x, y) {
    var pos = new google.maps.LatLng(y, x);
    var title = 'チャットのタイトル';
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: title,
    });
    new google.maps.InfoWindow({
      content: title
    }).open(map, marker);

    google.maps.event.addListener(marker, 'click', function(e) {
      openChat(e.latLng.G, e.latLng.K);
    });
  };

  $.ajax('/all_event.json', {
    method: 'GET',
    dataType: 'json'
  }).done(function(res) {
    res.positions.forEach(function(position) {
      putMarker(position['position_x'], position['position_y']);
    });
  }).fail(function() {
    alert('データの取得に失敗しました');
    // TODO: 仮のデータなので消す
    [
      { y: 35.682622, x: 139.766373 },
      { y: 35.705524, x: 139.7941462 },
      { y: 35.6295764, x: 139.794686 },
      { y: 35.6990369, x: 139.7437276 },
    ].forEach(function(location) {
      putMarker(location.x, location.y);
    });
  });
};

function openChat(x, y) {
  alert('open chat: ' + x + ', ' + y);
}