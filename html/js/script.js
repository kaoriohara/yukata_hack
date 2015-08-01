/*global $, google, LoadMessage */
window.onload = function() {
  var defaultPos = new google.maps.LatLng(35.681735, 139.762651);
  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 14,
    center: defaultPos,
    mapTypeControlOptions: { mapTypeIds: ['sample', google.maps.MapTypeId.ROADMAP] }/*表示タイプの指定*/
  });

  var samplestyle = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
      }
  ];
  
  var samplestyleOptions = {
    name: "シンプル"
  };
  
  var sampleMapType = new google.maps.StyledMapType(samplestyle, samplestyleOptions);
  map.mapTypes.set('simple', sampleMapType);
  map.setMapTypeId('simple');

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

  // イベントチャット追加
  google.maps.event.addListener(map, 'click', function(e) {
    var ok = confirm('ここにイベントを作りますか？');
    if (ok) {
      createEvent(e.latLng.G, e.latLng.K);
    }
  });
};

function openChat(x, y) {
  LoadMessage(x, y);
}
function createEvent(x, y) {
  $.ajax('/save_event', {
    method: 'POST',
    data: {
      'position_x': x,
      'position_y': y,
    },
  }).done(function() {
    alert('イベントを作りました');
    openChat(x, y);
  }).fail(function() {
    alert('イベントを作れませんでした');
  });
}
