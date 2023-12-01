from django.shortcuts import render
from django.http import JsonResponse
from .models import Exercise

def exercise_list(request):
    exercises = Exercise.objects.all()
    data = [{'name': exercise.name, 'duration': exercise.duration, 'calories_burned': exercise.calories_burned, 'date': exercise.date} for exercise in exercises]
    return JsonResponse(data, safe=False)
