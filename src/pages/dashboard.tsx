import DashCards from '@/components/Dashboard'
import Layout from '@/components/Layout/layout'

export default function Dashboard() {
  return (
    <Layout>
      <div className='page-animation'>
        <DashCards />
      </div>
    </Layout>
  )
}
