import Header from '../components/Header'
import CompanyList from '../components/CompanyList'

export default function Dashboard() {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem' }}>
        <h2>🏢 Firmenverwaltung</h2>
        <CompanyList />
      </main>
    </div>
  )
}
