from rest_framework import permissions

class IsOwnerOfParentProject(permissions.BasePermission):
    """
    Custom permission to only allow owners of the parent project to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Assuming the Folder model has a `parent_project` ForeignKey to the Project model
        return obj.parent_project.owner == request.user
