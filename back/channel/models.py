from django.db import models
# Create your models here.

class Channel (models.Model):
    title = models.CharField(max_length = 120)
    manager = models.IntegerField()
    # manager = models.ForeignKey(User, on_delete = models.CASCADE)

    def __str__(self):
        return self.title # Channel 로 불렀을때 나타나는 값
