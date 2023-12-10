    $(document).ready(function () {

    $('#addExerciseButton').click(function () {
        $('#addExerciseModal').modal('show');
    });

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

    $('#add-exercise-form').submit(function (event) {
        event.preventDefault();
        const formData = {
            name: $('#name').val(),
            duration: $('#duration').val(),
            calories: $('#calories').val(),
            date: $('#date').val()
        };

        $.ajax({
            url: '/add-exercise/',
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (data) {
                console.log('Exercise added successfully:', data);

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
            },
            error: function (error) {
                console.log('Error adding exercise:', error);
            }
        });
    });  

    });



        // Function to get the exercise list
        function renderExerciseList(data) {
            $('#exercise-list').empty();
            data.forEach(function(exercise) {
                const exerciseItem = $(`
            <li class="exercise-item">
                <div>
                    <strong>${exercise.name}</strong><br>
                    Duration: ${exercise.duration} minutes<br>
                    Calories Burned: ${exercise.calories_burned}<br>
                    Date: ${exercise.date}
                </div>
                <div class="icon-container">
                <i class="fas fa-edit edit-icon" onclick="editExercise(${exercise.id})"></i>
                <i class="fas fa-trash delete-icon" onclick="deleteExercise(${exercise.id})"></i>
                </div></li>
        `);
        $('#exercise-list').append(exerciseItem);
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
        
        //adding exercise
        $('#add-exercise-form').submit(function (event) {
            event.preventDefault();
            $.ajax({
                url: '/add-exercise/',
                type: 'POST',
                data: JSON.stringify({
                    name: $('#name').val(),
                    duration: $('#duration').val(),
                    calories: $('#calories').val(),
                    date: $('#date').val()
                }),
                contentType: 'application/json',
                success: function (data) {
                
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
                },
                error: function (error) {
                    console.log('Error adding exercise:', error);
                }
            });
        });
    
        //deleting exercise
        function deleteExercise(exerciseId) {
            $.ajax({
                url: `/delete-exercise/${exerciseId}/`,
                type: 'DELETE',
                success: function (data) {
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
                },
                error: function (error) {
                    console.log('Error deleting exercise:', error);
                }
            });
        }