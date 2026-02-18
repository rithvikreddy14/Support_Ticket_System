#!/usr/bin/env python
import os
import sys
# 1. Import dotenv
from dotenv import load_dotenv

def main():
    # 2. Read the .env file from the parent directory
    # Adjust path if .env is in 'backend/' or root 'support-ticket-system/'
    # Assuming .env is inside backend/ folder based on your setup:
    dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
    load_dotenv(dotenv_path)

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()