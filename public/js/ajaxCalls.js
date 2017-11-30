const ajaxCalls = {
    getCities: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "http://cunning-convoys.azurewebsites.net/api/Cities", success: function (result) {
                    resolve(result);
                }
            });
        });
    },
    getDMV: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "http://cunning-convoys.azurewebsites.net/api/Dmv", success: function (result) {
                    resolve(result);
                }
            });
        });
    },
    getConvoys: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "http://cunning-convoys.azurewebsites.net/api/Convoys", success: function (result) {
                    resolve(result);
                }
            });
        });
    },
    getNomadsNames: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "localhos:3000/api/nomadNames", success: function (result) {
                    resolve(result);
                }
            });
        });
    }
};