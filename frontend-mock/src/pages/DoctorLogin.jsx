import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function DoctorLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/doctor/login', { email, password })
      if (data.success) {
        localStorage.setItem('doctor_token', data.token)
        toast.success('Doctor logged in')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message)
    }
  }

  return (
    <form onSubmit={submit} className="min-h-[60vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Doctor Login</p>
        <div className="w-full">
          <p>Email</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
        <p className="text-xs text-gray-500">Hint (mock): any seeded doctor email, password: Password123</p>
      </div>
    </form>
  )
}
