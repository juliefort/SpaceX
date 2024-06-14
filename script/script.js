/* On charge l'entierté de la page avant le script */
$(function() {

    /* Fonction asynchrone pour attraper les erreurs */
    async function getData() {

        /* Récupération des données de l'api */
        try {
            await $.get('https://api.spacexdata.com/v5/launches/latest', function ( data ) {
                $('.missionName')
                    .append(data.name)

                $('.launchDate')
                    .append(data.date_utc)
            })

        } catch(error) {
            console.error(error)
        }
    }

    /* Initialisation de la fonction */
    getData()

    /* Création du compte à rebours */
    function getRealTime() {
        setInterval(function() {
            var launchTime = new Date('2022-10-05 16:00:00')
            var actualTime = new Date().getTime()

            var spaceLaunch = launchTime - actualTime
            var seconds = Math.floor(spaceLaunch % (1000 * 60) / 1000)

            var addToTimer = $('.timer')
            addToTimer.html(`${seconds}`)
        }, 1000)
    }

    /* Initialisation de la fonction */
    getRealTime()

    /* Création du filtrage des lancements */

    function filtered() {
        var successfull = $(".success")
        var failed = $(".failed")

        $(".choices").on("change", function () {
            if($( this ).val() === "launched")
            {
                failed.hide()
                successfull.show()
            } else if ($( this ).val() === "failed") {
                successfull.hide()
                failed.show()
            } else {
                successfull.show()
                failed.show()
            }
        })
    }

   filtered()
})