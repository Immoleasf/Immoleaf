import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CompanyList() {
  const [companies, setCompanies] = useState([])
  const [form, setForm] = useState({ name: '', industry: '', location: '' })

  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('/api/companies', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCompanies(res.data))
      .catch(err => console.error(err))
  }, [])

  const addCompany = async () => {
    try {
      await axios.post('/api/companies', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Firma angelegt')
      location.reload()
    } catch (err) {
      alert('Fehler beim Anlegen')
    }
  }

  return (
    <div>
      <h3>Firmenliste</h3>
      <ul>
        {companies.map(c => (
          <li key={c._id}>{c.name} ({c.industry})</li>
        ))}
      </ul>

      <h4>Neue Firma anlegen</h4>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Branche" onChange={e => setForm({ ...form, industry: e.target.value })} />
      <input placeholder="Ort" onChange={e => setForm({ ...form, location: e.target.value })} />
      <button onClick={addCompany}>Hinzufügen</button>
    </div>
  )
}
