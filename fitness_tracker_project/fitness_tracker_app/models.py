from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=100)
    duration = models.IntegerField()
    calories_burned = models.FloatField()
    date = models.DateField()

    def __str__(self):
        return self.name



