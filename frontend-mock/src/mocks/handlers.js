// MSW handlers that mimic the backend APIs used by the frontend
import { http, HttpResponse, delay } from 'msw'

// In-memory DB
const makeId = () => Math.random().toString(36).slice(2, 10)

// Seed doctors similar to assets.doctors but with extra backend fields
import { doctors as assetDoctors, assets } from '../assets/assets'

// Clone and enrich doctors with backend-like fields
const doctors = assetDoctors.map(d => ({
  ...d,
  email: `${d._id}@example.com`,
  available: d.available ?? true,
  slots_booked: {},
}))

// A single mock user acts as the logged-in patient
let users = [
  {
    _id: 'user1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'Password123',
    image: assets.profile_pic,
    phone: '555-0101',
    address: { line1: '221B Baker Street', line2: 'London' },
    gender: 'Male',
    dob: '1990-05-20',
  },
]

const tokens = new Map() // token -> { role, id }
let appointments = []

// Helpers
const withLatency = async (msMin = 200, msMax = 500) => {
  await delay(Math.floor(Math.random() * (msMax - msMin + 1)) + msMin)
}

const getAuth = (req) => {
  const token = req.headers.get('token') || req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null
  return tokens.get(token) || null
}

// Handlers that match the frontend usage exactly
export const handlers = [
  // GET /api/doctor/list
  http.get('*/api/doctor/list', async () => {
    await withLatency()
    return HttpResponse.json({ success: true, doctors })
  }),

  // POST /api/user/register
  http.post('*/api/user/register', async ({ request }) => {
    await withLatency()
    const body = await request.json()
    const { name, email, password } = body || {}
    if (!name || !email || !password) {
      return HttpResponse.json({ success: false, message: 'Missing Details' }, { status: 400 })
    }
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return HttpResponse.json({ success: false, message: 'User already exists' }, { status: 409 })
    }
    const user = {
      _id: makeId(),
      name,
      email,
      password,
      image: assets.profile_pic,
      phone: '',
      address: { line1: '', line2: '' },
      gender: 'Male',
      dob: '',
    }
    users.push(user)
    const token = makeId()
    tokens.set(token, { role: 'patient', id: user._id })
  return HttpResponse.json({ success: true, token, role: 'patient' })
  }),

  // POST /api/user/login
  http.post('*/api/user/login', async ({ request }) => {
    await withLatency()
    const body = await request.json()
    const { email, password } = body || {}
    const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase())
    if (!user || user.password !== password) {
      return HttpResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    }
    const token = makeId()
    tokens.set(token, { role: 'patient', id: user._id })
  return HttpResponse.json({ success: true, token, role: 'patient' })
  }),

  // GET /api/user/get-profile (expects header token)
  http.get('*/api/user/get-profile', async ({ request }) => {
    await withLatency()
    const auth = getAuth(request)
    if (!auth || auth.role !== 'patient') {
      return HttpResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const user = users.find(u => u._id === auth.id)
    return HttpResponse.json({ success: true, user })
  }),

  // POST /api/user/update-profile (multipart form)
  http.post('*/api/user/update-profile', async ({ request }) => {
    await withLatency()
    const auth = getAuth(request)
    if (!auth || auth.role !== 'patient') {
      return HttpResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const formData = await request.formData()
    const name = formData.get('name')
    const phone = formData.get('phone')
    const addressRaw = formData.get('address')
    const dob = formData.get('dob')
    const gender = formData.get('gender')
    const image = formData.get('image')

    if (!name || !phone || !dob || !gender) {
      return HttpResponse.json({ success: false, message: 'Data Missing' }, { status: 400 })
    }
    const user = users.find(u => u._id === auth.id)
    user.name = name
    user.phone = phone
    try {
      user.address = addressRaw ? JSON.parse(addressRaw) : user.address
  } catch {
      // ignore invalid JSON and keep previous address
    }
    user.dob = dob
    user.gender = gender
    if (image) {
      // Simulate upload result
      user.image = user.image || assets.profile_pic
    }
    return HttpResponse.json({ success: true, message: 'Profile Updated' })
  }),

  // POST /api/user/book-appointment
  http.post('*/api/user/book-appointment', async ({ request }) => {
    await withLatency()
    const auth = getAuth(request)
    if (!auth || auth.role !== 'patient') {
      return HttpResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    const { docId, slotDate, slotTime } = body || {}
    const doc = doctors.find(d => d._id === docId)
    if (!doc) return HttpResponse.json({ success: false, message: 'Doctor not found' }, { status: 404 })
    if (!doc.available) return HttpResponse.json({ success: false, message: 'Doctor not available' }, { status: 400 })

    const slots = doc.slots_booked
    if (!slots[slotDate]) slots[slotDate] = []
    if (slots[slotDate].includes(slotTime)) {
      return HttpResponse.json({ success: false, message: 'Slot not available' }, { status: 409 })
    }
    slots[slotDate].push(slotTime)

    const user = users.find(u => u._id === auth.id)
    const appointment = {
      _id: makeId(),
      userId: user._id,
      docId: doc._id,
      slotDate,
      slotTime,
      userData: { ...user },
      docData: { ...doc, slots_booked: undefined },
      amount: doc.fees,
      date: Date.now(),
      cancelled: false,
      payment: false,
      isCompleted: false,
    }
    appointments.push(appointment)
    return HttpResponse.json({ success: true, message: 'Appointment Booked' })
  }),

  // GET /api/user/appointments
  http.get('*/api/user/appointments', async ({ request }) => {
    await withLatency()
    const auth = getAuth(request)
    if (!auth || auth.role !== 'patient') {
      return HttpResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const list = appointments.filter(a => a.userId === auth.id)
    return HttpResponse.json({ success: true, appointments: list })
  }),

  // POST /api/user/cancel-appointment
  http.post('*/api/user/cancel-appointment', async ({ request }) => {
    await withLatency()
    const auth = getAuth(request)
    if (!auth || auth.role !== 'patient') {
      return HttpResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    const { appointmentId } = body || {}
    const appt = appointments.find(a => a._id === appointmentId)
    if (!appt) return HttpResponse.json({ success: false, message: 'Appointment not found' }, { status: 404 })
    if (appt.userId !== auth.id) {
      return HttpResponse.json({ success: false, message: 'Unauthorized action' }, { status: 403 })
    }
    appt.cancelled = true
    // release slot
    const doc = doctors.find(d => d._id === appt.docId)
    const slots = doc?.slots_booked?.[appt.slotDate]
    if (Array.isArray(slots)) {
      doc.slots_booked[appt.slotDate] = slots.filter(t => t !== appt.slotTime)
    }
    return HttpResponse.json({ success: true, message: 'Appointment Cancelled' })
  }),
]
