# Generated by Django 4.2.6 on 2023-10-23 01:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_customuser_email_alter_customuser_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='name',
            field=models.CharField(blank=True, error_messages={'blank': 'Name cannot be blank.', 'max_length': 'Name is too long.', 'null': 'Name cannot be null.'}, max_length=150, null=True),
        ),
    ]
