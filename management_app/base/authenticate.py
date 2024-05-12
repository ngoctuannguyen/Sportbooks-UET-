from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class AdminAuthentication(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        if request.user.is_staff:
            return Response({"message": "This endpoint is accessible only by admin users."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "You do not have permission to access this endpoint."}, status=status.HTTP_403_FORBIDDEN)

    def post(self, request, *args, **kwargs):
        return Response({"message": "POST request processed."}, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        return Response({"message": "PUT request processed."}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        return Response({"message": "DELETE request processed."}, status=status.HTTP_200_OK)

class UserAuthentication(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response({"message": "This endpoint is accessible only by authenticated users."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "You must be authenticated to access this endpoint."}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, *args, **kwargs):
        return Response({"message": "POST request processed."}, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        return Response({"message": "PUT request processed."}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):

        return Response({"message": "DELETE request processed."}, status=status.HTTP_200_OK)
