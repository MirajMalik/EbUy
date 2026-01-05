# EbUy — E-Commerce Website (Node.js + React)

### Overview
EbUy is a simple learning-oriented e-commerce project built with:
- **Backend:** Node.js, Express, MongoDB (in `/server`)
- **Frontend:** React (in `/client`)

---

# Steps

-Implement /users/:id UI 

## Registration + Email Verification Flow

### 1) Register
Frontend sends a multipart/form-data request to:

POST `/api/users/process-register`

Fields:
- name, email, password, phone, address
- image (file) required

Backend generates an activation JWT (10 minutes) and sends an email.

### 2) Verify
Frontend verifies the user by sending:

POST `/api/users/verify`

Body:
```json
{ "token": "<activation_token>" }

### Product browsing
- `/products` shows product list (mock data for now)
- `/products/:id` shows a single product details page
- Add to cart works from both list page and details page
- Cart uses browser localStorage 


