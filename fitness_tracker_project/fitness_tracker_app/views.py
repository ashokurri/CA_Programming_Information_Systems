from django.shortcuts import render
from django.http import JsonResponse
from .models import Exercise
from django.views.decorators.csrf import csrf_exempt
import json
def home(request):
    return render(request, 'exercise_list.html')

def exercise_list(request):
    exercises = Exercise.objects.all()
    data = [{'name': exercise.name, 'duration': exercise.duration, 'calories_burned': exercise.calories_burned, 'date': exercise.date} for exercise in exercises]
    return JsonResponse(data, safe=False)

@csrf_exempt
def add_exercise(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        new_exercise = Exercise.objects.create(
            name=body['name'],
            duration=body['duration'],
            calories_burned=body['calories'],
            date=body['date']
        )
        return JsonResponse({'message': 'Exercise added successfully'})
    return JsonResponse({'message': 'Failed to add exercise'}, status=400)

@csrf_exempt
def delete_exercise(request, exercise_id):
    try:
        exercise = Exercise.objects.get(pk=exercise_id)
        exercise.delete()
        return JsonResponse({'message': 'Exercise deleted successfully'})
    except Exercise.DoesNotExist:
        return JsonResponse({'message': 'Exercise does not exist'}, status=404)