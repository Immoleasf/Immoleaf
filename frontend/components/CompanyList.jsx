import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CompanyList() {
  const [companies, setCompanies] = useState([])
  const [form, setForm] = useState({ name: '', industry: '', location: '' })
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('/api/companies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCompanies(res.data)
    } catch (err) {
      console.error('Fehler beim Laden der Firmen:', err)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  const addCompany = async () => {
    try {
      setLoading(true)
      await axios.post('/api/companies', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Firma erfolgreich angelegt')
      setForm({ name: '', industry: '', location: '' })
      fetchCompanies() // neu laden statt location.reload()
    } catch (err) {
      alert('Fehler beim Anlegen der Firma')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Firmenliste</h2>
      <ul>
        {companies.map(c => (
          <li key={c._id}>
            <strong>{c.name}</strong> – {c.industry || 'Branche unbekannt'}
          </li>
        ))}
      </ul>

      <h3>Neue Firma anlegen</h3>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Branche"
        value={form.industry}
        onChange={e => setForm({ ...form, industry: e.target.value })}
      />
      <input
        placeholder="Ort"
        value={form.location}
        onChange={e => setForm({ ...form, location: e.target.value })}
      />
      <button onClick={addCompany} disabled={loading}>
        {loading ? 'Speichern...' : 'Hinzufügen'}
      </button>
    </div>
  )
}
