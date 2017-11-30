const gInterface = {
    initMap: function () {
        ajaxCalls.getCities().then(data => {
            let arrayData = [['City', 'Population', "Area"]];
            data.forEach(item => {
                arrayData.push(
                    [item.name, item.population, item.area]);
            });

            google.charts.load('current', {
                'packages': ['geochart'],
                'mapsApiKey': 'AIzaSyC6Kh2SktbSoAyR_8XeVaSqBKo6340URXk'
            });
            google.charts.setOnLoadCallback(drawMarkersMap);

            function drawMarkersMap() {
                let data = google.visualization.arrayToDataTable(arrayData);

                let options = {
                    displayMode: 'markers',
                    colorAxis: {colors: ['#1d2469', '#aa3251']}
                };

                let chart = new google.visualization.GeoChart(document.getElementById('geomap'));
                chart.draw(data, options);
            }
        });
        ajaxCalls.getCities().then(citiesData => {
            let arrayData = [['City', 'Properties']];
            citiesData.forEach(item => {
                let density = Math.round(item.population / item.area);
                if(density > 8500) {
                    gInterface.showAlert(item.name ,density);
                }
                arrayData.push(
                    [item.name, "<strong>" + item.name + " (" + item.country + ")</strong><br />" +
                    "Population: " + item.population + "<br />" +
                    "Area: " + item.area + "<br/>" +
                    "Density: " + density + " people / km²"]);
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
    },
    showAlert: function (city, density) {
        let $alertModal = $('#alertModal');
        $alertModal.find(".city").text(city);
        $alertModal.find(".density").text(density);
        $alertModal.modal('show');
    },
    initAutoComplete: function () {
        ajaxCalls.getNomadsNames().then(nomadNames => {
            $( "#search" ).autocomplete({
                source: nomadNames
            });
        });

    }
};

$(document).ready(function () {
    gInterface.bindEvents();
    gInterface.initMap();
    gInterface.initAutoComplete();
    // setInterval(gInterface.initMap, 10*1000);
});