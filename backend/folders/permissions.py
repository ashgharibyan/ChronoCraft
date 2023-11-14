from rest_framework import permissions

# class IsOwnerOfParentProject(permissions.BasePermission):
#     """
#     Custom permission to only allow owners of the parent project to edit it.
#     """

#     def has_object_permission(self, request, view, obj):
#         # Assuming the Folder model has a `parent_project` ForeignKey to the Project model
#         return obj.parent_project.owner == request.user


class IsProjectOwner(permissions.BasePermission):
    message = "You don't have permission to add to this project"

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user