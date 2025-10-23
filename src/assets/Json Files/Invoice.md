To include constant data and unique identifiers in a single JSON format for identifying different types of invoices, you can structure your JSON like this:

### JSON Structure

```json
{
  "constantData": {
    "supplier": {
      "name": "Supplier Company INC",
      "number": "23456789",
      "vat": "23456789",
      "address": "6622 Abshire Mills, Port Orlofurt, 05820, United States"
    }
  },
  "invoices": [
    {
      "id": "inv001",
      "date": "April 26, 2023",
      "invoiceNumber": "BRA-00335",
      "customer": {
        "name": "Customer Company",
        "number": "123456789",
        "vat": "23456789",
        "address": "9552 Vandervort Spurs, Paradise, 43325, United States"
      },
      "items": [
        {
          "number": 1,
          "description": "Monthly accounting services",
          "price": 150.00,
          "quantity": 1,
          "vat": "20%",
          "subtotal": 150.00,
          "total": 180.00
        },
        {
          "number": 2,
          "description": "Taxation consulting (hour)",
          "price": 60.00,
          "quantity": 2,
          "vat": "20%",
          "subtotal": 120.00,
          "total": 144.00
        },
        {
          "number": 3,
          "description": "Bookkeeping services",
          "price": 50.00,
          "quantity": 1,
          "vat": "20%",
          "subtotal": 50.00,
          "total": 60.00
        }
      ],
      "totals": {
        "netTotal": 320.00,
        "vatTotal": 64.00,
        "grandTotal": 384.00
      },
      "paymentDetails": {
        "bankName": "Banks of Banks",
        "sortCode": "1234567",
        "accountNumber": "123456678",
        "reference": "BRA-00335"
      },
      "notes": "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
    },
    {
      "id": "inv002",
      "date": "April 26, 2023",
      "invoiceNumber": "BRA-00336",
      "customer": {
        "name": "Corporate Client Ltd",
        "number": "987654321",
        "vat": "98765432",
        "address": "123 Corporate Plaza, Suite 100, Business City, 54321, United States"
      },
      "items": [
        {
          "number": 1,
          "description": "Annual consultancy services",
          "price": 1200.00,
          "quantity": 1,
          "vat": "15%",
          "subtotal": 1200.00,
          "total": 1380.00
        },
        {
          "number": 2,
          "description": "Corporate tax audit",
          "price": 500.00,
          "quantity": 1,
          "vat": "15%",
          "subtotal": 500.00,
          "total": 575.00
        }
      ],
      "totals": {
        "netTotal": 1700.00,
        "vatTotal": 255.00,
        "grandTotal": 1955.00
      },
      "paymentDetails": {
        "bankName": "Big Bank",
        "sortCode": "7654321",
        "accountNumber": "87654321",
        "reference": "BRA-00336"
      },
      "notes": "Thank you for your business. We look forward to working with you again."
    },
    {
      "id": "inv003",
      "date": "April 26, 2023",
      "invoiceNumber": "BRA-00337",
      "customer": {
        "name": "Small Business LLC",
        "number": "55667788",
        "vat": "55667788",
        "address": "789 Small Business Rd, Startup Town, 12345, United States"
      },
      "items": [
        {
          "number": 1,
          "description": "Graphic design work",
          "price": 300.00,
          "quantity": 1,
          "vat": "10%",
          "subtotal": 300.00,
          "total": 330.00
        },
        {
          "number": 2,
          "description": "Website development",
          "price": 800.00,
          "quantity": 1,
          "vat": "10%",
          "subtotal": 800.00,
          "total": 880.00
        }
      ],
      "totals": {
        "netTotal": 1100.00,
        "vatTotal": 110.00,
        "grandTotal": 1210.00
      },
      "paymentDetails": {
        "bankName": "Freelancer Bank",
        "sortCode": "5555555",
        "accountNumber": "444433332222",
        "reference": "BRA-00337"
      },
      "notes": "Please make payment within 15 days. Thank you!"
    },
    {
      "id": "inv004",
      "date": "April 26, 2023",
      "invoiceNumber": "BRA-00338",
      "customer": {
        "name": "Government Agency",
        "number": "112233445",
        "vat": "112233445",
        "address": "100 Government St, Admin City, 78901, United States"
      },
      "items": [
        {
          "number": 1,
          "description": "Compliance training",
          "price": 500.00,
          "quantity": 2,
          "vat": "25%",
          "subtotal": 1000.00,
          "total": 1250.00
        }
      ],
      "totals": {
        "netTotal": 1000.00,
        "vatTotal": 250.00,
        "grandTotal": 1250.00
      },
      "paymentDetails": {
        "bankName": "GovBank",
        "sortCode": "7777777",
        "accountNumber": "555566667777",
        "reference": "BRA-00338"
      },
      "notes": "This invoice is subject to government payment terms."
    },
    {
      "id": "inv005",
      "date": "April 26, 2023",
      "invoiceNumber": "BRA-00339",
      "customer": {
        "name": "Non-Profit Org",
        "number": "99887766",
        "vat": "99887766",
        "address": "321 Charity Blvd, Giving Town, 65432, United States"
      },
      "items": [
        {
          "number": 1,
          "description": "Fundraising event planning",
          "price": 400.00,
          "quantity": 1,
          "vat": "5%",
          "subtotal": 400.00,
          "total": 420.00
        },
        {
          "number": 2,
          "description": "Volunteer management",
          "price": 200.00,
          "quantity": 1,
          "vat": "5%",
          "subtotal": 200.00,
          "total": 210.00
        }
      ],
      "totals": {
        "netTotal": 600.00,
        "vatTotal": 30.00,
        "grandTotal": 630.00
      },
      "paymentDetails": {
        "bankName": "Charity Bank",
        "sortCode": "8888888",
        "accountNumber": "777788889999",
        "reference": "BRA-00339"
      },
      "notes": "Thank you for supporting our cause. We appreciate your contribution!"
    }
  ]
}
```

### Explanation

1. **`constantData`**: This section contains data that is common across all invoices, such as the supplier's details. This helps in maintaining consistency and avoiding redundancy.

2. **`invoices`**: An array of invoice objects, each with a unique `id` for identification purposes. Each invoice object includes:
   - **`id`**: Unique identifier for the invoice.
   - **`date`**: Invoice date.
   - **`invoiceNumber`**: Invoice number.
   - **`customer`**: Customer details.
   - **`items`**: List of items with details like description, price, quantity, VAT, and totals.
   - **`totals`**: Summary of the totals including net total, VAT total, and grand total.
   - **`paymentDetails`**: Details for payment processing.
   - **`notes`**: Additional notes related to the invoice.

You can use this JSON structure to dynamically generate invoice content based on different user types and scenarios while keeping constant data consistent across invoices.
