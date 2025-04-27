# CSV to JSON Convertor API (Node + Postgres)

This project is a Node.js-based API that:
- Parses a complex CSV file (with dot-separated nested keys)
- Stores each row in a PostgreSQL database
- Computes and prints an age-distribution report

## Features

- Custom CSV parser (no external CSV libraries)
- Supports deeply nested fields like `a.b.c.d...`
- Uses JSONB for nested data in Postgres
- Handles large files (> 50k rows)
- Logs an age group distribution report

## Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/csv-json-api.git
cd csv-json-api