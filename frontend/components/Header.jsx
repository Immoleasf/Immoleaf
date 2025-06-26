import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/') // eleganter als window.location.href
  }

  return (
    <header style={{ background: '#eee', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0 }}>Immoleaf Admin</h1>
      <button onClick={logout}>Logout</button>
    </header>
  )
}
