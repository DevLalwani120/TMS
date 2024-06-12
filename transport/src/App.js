import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/adminDashboard';
import ClientDashboard from './components/clientDashboard';
import PreviewInvoice from './components/previewInvoice';
import CashReceiptPreview from './components/cashReceiptPreview';
import AdditionalReceiptPreview from './components/additionalReceiptPreview';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminDashboard/*" element={<AdminDashboard />} />
        <Route path="/clientDashboard/*" element={<ClientDashboard />} />
        <Route path="/preview-invoice/*" element={<PreviewInvoice />} />
        <Route path='/cash-receipt-preview/*' element={<CashReceiptPreview/>}/>
        <Route path='/additional-cash-receipt-preview/*' element={<AdditionalReceiptPreview/>}/>
      </Routes>
    </Router>
  );
};

export default App;
