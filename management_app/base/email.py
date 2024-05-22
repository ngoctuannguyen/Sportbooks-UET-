from django.shortcuts import render
from django.core.mail import EmailMessage, EmailMultiAlternatives, send_mail

user = ['ngoctuannguyen1980123@gmail.com']

def contact(request):
    if request.method == 'POST':
        message_name = request.POST['message-name']
        message_email = request.POST['message-email']
        message = request.POST['message']

        send_mail(
            message_name,
            message,
            message_email,
            user,
        )
