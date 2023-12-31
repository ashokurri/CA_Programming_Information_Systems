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
                $('#name').val('');
                $('#duration').val('');
                $('#calories').val('');
                $('#date').val('');
                $('#addExerciseModal').modal('hide');
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
                alert('Error adding exercise:' + error.responseJSON.message);
            }
        });
    });  


    $('#edit-exercise-form').submit(function (event) {

        event.preventDefault();
    const formData = {
        name: $('#edit-name').val(),
        duration: $('#edit-duration').val(),
        calories: $('#edit-calories').val(),
        date: $('#edit-date').val()
    };

    const exerciseId = $('#edit-exercise-id').val();

    $.ajax({
        url: `/edit-exercise/${exerciseId}/`,
        type: 'POST',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function (data) {
            console.log('Exercise updated successfully:', data);
            
            $('#editExerciseModal').modal('hide');
           
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
            console.log('Error updating exercise:', error);
        }
    });


    });


    });

        // Function to get the exercise list
        function renderExerciseList(data) {
            $('#exercise-list').empty();
            data.forEach(function (exercise) {
                const exerciseItem = $(`
                    <li class="exercise-item" data-exercise-id="${exercise.id}">
                        <div>
                            <strong>${exercise.name}</strong><br>
                            Duration: ${exercise.duration} minutes<br>
                            Calories Burned: ${exercise.calories_burned}<br>
                            Date: ${exercise.date}
                        </div>
                        <div class="icon-container">
                            <i class="fas fa-edit edit-icon" onclick="editExercise(${exercise.id})"></i>
                            <i class="fas fa-trash delete-icon" onclick="deleteExercise(${exercise.id})"></i>
                        </div>
                    </li>
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
            const confirmDelete = confirm('Are you sure you want to delete this exercise?');
            if(confirmDelete)
            {
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
        }


        function editExercise(exerciseId) {
    
            $.ajax({
                url: `/edit-exercise/${exerciseId}/`,
                type: 'GET',  
                success: function (data) {
                    $('#edit-exercise-id').val(exerciseId);
                    $('#edit-name').val(data.name);
                    $('#edit-duration').val(data.duration);
                    $('#edit-calories').val(data.calories_burned);
                    $('#edit-date').val(data.date);
        
                    
                    $('#editExerciseModal').modal('show');
                },
                error: function (error) {
                    console.log('Error fetching exercise details:', error);
                }
            });
        }

