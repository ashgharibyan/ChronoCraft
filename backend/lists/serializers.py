from rest_framework import serializers
from .models import List

class ListSerializer(serializers.ModelSerializer):
    # parent_folder = serializers.ReadOnlyField(source='parent_folder.pk')

    class Meta:
        model = List
        fields = ["id", "name", "parent_folder", "created_at", "updated_at"]
