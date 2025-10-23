from faker import Faker
import random
from datetime import datetime, timedelta
import json
import os

# Initialize the Faker library
fake = Faker()

def get_random_int(min_val, max_val):
    return random.randint(min_val, max_val)

def random_month_and_year():
    """Returns a random year and month."""
    year = random.randint(2023, 2024)  # Adjust year range as needed
    month = random.randint(1, 12)  # Months from 1 to 12
    return year, month

def epoch_to_date(epoch):
    """Converts an epoch timestamp to a date string."""
    return datetime.fromtimestamp(epoch).strftime('%d/%m/%Y')

def epoch_to_time(epoch):
    """Converts an epoch timestamp to a time string."""
    return datetime.fromtimestamp(epoch).strftime('%I:%M %p')

def generate_random_order_dates(quantity, base_date):
    """Generates random order dates within a specified month using epoch timestamps."""
    order_dates = []

    # Calculate the first and last day of the month
    start_date = base_date.replace(day=1)
    end_date = (base_date + timedelta(days=31)).replace(day=1) - timedelta(days=1)

    # Convert start_date and end_date to epoch
    start_epoch = int(start_date.timestamp())
    end_epoch = int(end_date.timestamp())

    for _ in range(quantity):
        random_epoch = random.randint(start_epoch, end_epoch)

        order_dates.append({
            'date': epoch_to_date(random_epoch),
            'time': epoch_to_time(random_epoch),
            'amount': f"₹{get_random_int(1000, 8000)}",
            'quantity': get_random_int(10, 100)
        })

    return order_dates

def get_random_item_description(item_type):
    """Generates a random description for the item."""
    descriptions = {
        'Cap': ["Stylish Cap", "Summer Cap", "Sporty Cap"],
        'Watercan': ["Plastic Watercan", "Metal Watercan", "Garden Watercan"],
        'Bubble': ["Soapy Bubble", "Foamy Bubble", "Shiny Bubble"]
    }
    return random.choice(descriptions[item_type])

def generate_random_invoice(number):
    year, month = random_month_and_year()
    base_date = datetime(year, month, 1)  # Start of the random month

    item_types = ['Cap', 'Watercan', 'Bubble']

    # Ensure at least 2 or 3 items
    num_items = min(len(item_types), random.randint(2, 3))

    items = []

    for _ in range(num_items):
        item_type = random.choice(item_types)
        item_description = get_random_item_description(item_type)
        item_quantity = get_random_int(10, 100)
        item_rate = get_random_int(50, 70)
        item_amount = item_quantity * item_rate

        item_data = {
            'description': item_description,
            'quantity': item_quantity,
            'rate': f"₹{item_rate}",
            'amount': f"₹{item_amount:,}",
            'OrderItemsDates': generate_random_order_dates(get_random_int(5, 12), base_date)
        }

        items.append(item_data)

    invoice = {
        'date': base_date.strftime('%B %d, %Y'),
        'invoice_number': f"#BRA-{number:05}",
        'billed_by': {
            'company': "Bringjal Innovations Private Limited",
            'location': "Karnataka, India",
            'email': fake.email(),
            'phone': fake.phone_number()
        },
        'billed_to': {
            'company': fake.company(),
            'address': f"{fake.street_address()}, {fake.city()}, Karnataka, India - {fake.zipcode()}"
        },
        'items': items,
        'bank_details': {
            'account_name': fake.company(),
            'account_number': fake.bban(),  # Generate a random bank account number
            'ifsc': f"KKBK{get_random_int(1000, 9999)}",  # Generate a random IFSC code ending
            'account_type': random.choice(['Current', 'Savings']),
            'bank': fake.company()  # Random bank name
        }
    }

    return invoice

def generate_invoices(count):
    invoices = []
    for i in range(count):
        invoice = generate_random_invoice(335 + i)  # Start invoice numbering from 335
        invoices.append(invoice)

    return invoices

def save_invoices_to_file(invoices, folder_path, file_name):
    # Create the directory if it doesn't exist
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    file_path = os.path.join(folder_path, file_name)

    # Wrap invoices in the 'InvoicesAll' key
    data_to_save = {"InvoicesAll": invoices}

    with open(file_path, 'w') as file:
        json.dump(data_to_save, file, indent=4)

# Example usage:
if __name__ == "__main__":
    folder_path = 'F:/1-8-24/bringjalWebsite2024/bringjalWebsite2024/src/assets/Json Files'  # Specify the folder path
    num_invoices = 50  # Number of invoices to generate
    invoices = generate_invoices(num_invoices)
    save_invoices_to_file(invoices, folder_path, 'invoices.json')
