import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LangProvider } from './i18n'
import { ContactProvider } from './components/Contact'
import Layout from './components/Layout'
import Home from './pages/Home'
import { About, Careers, Contact, News, Services } from './pages/Pages'

export default function App() {
  return (
    <LangProvider>
      <ContactProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="omoss" element={<About />} />
              <Route path="tjenester" element={<Services />} />
              <Route path="nyheter" element={<News />} />
              <Route path="karriere" element={<Careers />} />
              <Route path="kontakt" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContactProvider>
    </LangProvider>
  )
}
