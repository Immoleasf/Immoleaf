export default function Header() {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <header style={{ background: '#eee', padding: '1rem' }}>
      <h1>Immoleaf Admin</h1>
      <button onClick={logout}>Logout</button>
    </header>
  )
}
