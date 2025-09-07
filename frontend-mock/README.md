# Frontend Mock (Doctor Appointment System)

This front-end is fully runnable without a backend using MSW (Mock Service Worker).

What’s mocked:
- Auth: patient register/login returning `{ success, token }`.
- Doctors: `/api/doctor/list` provides realistic doctors.
- Profile: `/api/user/get-profile`, `/api/user/update-profile` (multipart form).
- Appointments: list, book, cancel.

Mock location: `src/mocks/`.

Run it:

1) Install deps (first time only)
2) Start dev server

MSW auto-starts in development. No .env is required; API base defaults to same-origin.

Endpoints used by the UI:
- GET `/api/doctor/list`
- POST `/api/user/register` (name, email, password)
- POST `/api/user/login` (email, password)
- GET `/api/user/get-profile` (header: token)
- POST `/api/user/update-profile` (form-data: name, phone, address JSON, gender, dob, optional image; header: token)
- POST `/api/user/book-appointment` ({ docId, slotDate, slotTime }; header: token)
- GET `/api/user/appointments` (header: token)
- POST `/api/user/cancel-appointment` ({ appointmentId }; header: token)

Simulation details:
- 200–500ms random delay on all requests.
- Realistic validation and errors (missing fields, invalid login, duplicate slot).
- In-memory state persists while the page is open.

Note: Admin/Doctor panel APIs exist in the backend, but the `frontend-mock` UI only calls the endpoints listed above, so only those are mocked.
