    // Function to get the exercise list
    function renderExerciseList(data) {
        $('#exercise-list').empty();
        data.forEach(function(exercise) {
            $('#exercise-list').append(`
                <li>
                    <div>
                        <strong>${exercise.name}</strong><br>
                        Duration: ${exercise.duration} minutes<br>
                        Calories Burned: ${exercise.calories_burned}<br>
                        Date: ${exercise.date}
                    </div>
                    <button onclick="deleteExercise(${exercise.id})">Delete</button>
                </li>
            `);
        });
    }

    $(document).ready(function () {
        $.ajax({
            url: '/exercises/',
            type: 'GET',
            success: function (data) {
                renderExerciseList(data);
            },
            error: function (error) {
                console.log('Error fetching exercises:', error);
            }
        });
    });

    