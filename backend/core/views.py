from django.shortcuts import render
from django.http import HttpResponse
def TestView(request):
    return HttpResponse("Hello, world. You're at the core index.")

