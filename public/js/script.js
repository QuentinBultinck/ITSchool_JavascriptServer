const ajaxCalls = {
    getCities: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "http://cunning-convoys.azurewebsites.net/api/Cities", success: function (result) {
                    resolve(result);
                }
            });
        });
    }
};

const gInterface = {
    initMap: function () {
        ajaxCalls.getCities().then(data => {
            console.log(data);
            let arrayData = [['Country', 'Population Density']];
            data.forEach(item => {
                arrayData.push(
                    [item.country, "Population Density: " + Math.round(item.population / item.area) + " people / km²"]);
            });

            google.charts.load('current', {'packages': ['map']});
            google.charts.setOnLoadCallback(drawMap);

            function drawMap() {
                let data = google.visualization.arrayToDataTable(arrayData);

                let options = {
                    mapType: 'styledMap',
                    showTooltip: true,
                    showInfoWindow: true,
                    icons: {
                        default: {
                            normal: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Ball-Azure-icon.png',
                            selected: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Ball-Right-Azure-icon.png'
                        }
                    },
                    maps: {
                        // Your custom mapTypeId holding custom map styles.
                        styledMap: {
                            name: 'Styled Map', // This name will be displayed in the map type control.
                            styles: [
                                {featureType: 'poi.attraction',
                                    stylers: [{color: '#fce8b2'}]
                                },
                                {featureType: 'road.highway',
                                    stylers: [{hue: '#0277bd'}, {saturation: -50}]
                                },
                                {featureType: 'road.highway',
                                    elementType: 'labels.icon',
                                    stylers: [{hue: '#000'}, {saturation: 100}, {lightness: 50}]
                                },
                                {featureType: 'landscape',
                                    stylers: [{hue: '#259b24'}, {saturation: 10}, {lightness: -22}]
                                }
                            ]}}
                };

                let map = new google.visualization.Map(document.getElementById('map'));

                map.draw(data, options);
            }
        });
    },
    bindEvents: function () {
        let self = this;
    }
};

$(document).ready(function () {
    gInterface.bindEvents();
    gInterface.initMap();
});