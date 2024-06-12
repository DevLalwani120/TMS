import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/cashReceipt.css';
import numberToWords from '@jstb/num-to-words-indian';
import { toast } from 'react-toastify';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

const CashReceiptPreview = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { grNo } = location.state || {};
  const [companyDetails, setCompanyDetails] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const response = await axios.get('https://tms-server-nt4d.onrender.com/companydetails', {
          headers: { 'email': email }
        });
        setCompanyDetails(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
        toast.error('Error fetching company details.');
      }
    };

    fetchClient();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const response = await axios.get('https://tms-server-nt4d.onrender.com/getcashreceiptpreview', {
          params: { grNo, clientemail: email }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching cash receipt details:', error);
        toast.error('Error fetching cash receipt details.');
      }
    };

    fetchData();
  }, [grNo]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const grossTotalWords = numberToWords(data[0]?.grossTotal) + ' rupees only';

  const biltydatemoment=moment(data[0]?.biltydate)
  const biltydateformattedDate=biltydatemoment.format('DD-MMMM-YYYY')
  const cashdatemoment=moment(data[0]?.additionalreceiptdate)
  const cashdateformattedDate=cashdatemoment.format('DD-MMMM-YYYY')

  return (
    <div className="">
      <div className="head-cashreceipt">
        <div>
          <h2>{companyDetails?.company_name}<button  className='no-print previewbtn' onClick={() => window.print()}><FontAwesomeIcon icon={faPrint} size="lg"/></button></h2>
          <h3 className='upperdata'>Head Office: {companyDetails?.ho_address}, {companyDetails?.ho_city}, {companyDetails?.ho_state}, {companyDetails?.ho_pin_code}</h3>
          <h3 className='upperdata'>Contact: {companyDetails?.contact_no}, {companyDetails?.email}</h3>
        </div>
        <div className="top-cashreceipt">
          <h3 className='upperdata'>GST: {companyDetails.gstin}</h3>
          <h3 className='upperdata'>CASH RECEIPT</h3>
        </div>
      </div>
      <form>
        <div className="row-cashreceipt row1-cashreceipt">
          <h3 className='receiptno'>Receipt Number: <input type="number" className="input-cashreceipt" value={data[0]?.cashreceiptno || "-"} readOnly /></h3>
          <h3 className='cashreceiptdate'>Date: <input type="text" className="input-cashreceipt" name="date" readOnly value={cashdateformattedDate}/></h3>
        </div>
        <div className="row-cashreceipt row2-cashreceipt">
          <h3>Received with thanks from Mr./Mrs: <input type="text" className="input-cashreceipt" name="receivedFrom" readOnly value={data[0]?.receivedFrom || "-"}/></h3>
        </div>
        <div className="row-cashreceipt row3-cashreceipt">
          <h3 className='fromcashreceipt'>From: <input type="text" className="input-cashreceipt" value={data[0]?.cashreceiptfrom || "-"} readOnly /></h3>
          <h3 className='tocashreceipt'>To: <input type="text" className="input-cashreceipt" value={data[0]?.cashreceiptto || "-"} readOnly /></h3>
          <h3 className='branchcashreceipt'>Branch: <input type="text" className="input-cashreceipt" name="branch" readOnly value={data[0]?.cashreceiptbranch || "-"}/></h3>
        </div>
        <div className="row-cashreceipt row4-cashreceipt">
          <h3>GrNo.: <input type="number" className="input-cashreceipt" value={data[0]?.grno || "-"} readOnly /></h3>
          <h3>Date: <input type="text" className="input-cashreceipt" value={biltydateformattedDate} readOnly /></h3>
          <h3>Packages: <input type="text" className="input-cashreceipt" name="packages" value={data[0]?.packages || "-"} readOnly /></h3>
        </div>
        <div className="row-cashreceipt row5-cashreceipt">
          <h3>Cash/Cheque Number: <input type="text" className="input-cashreceipt" name="cashOrChequeNo" value={data[0]?.cashOrChequeNo || "-"} readOnly /></h3>
          <h3>Bill Number: <input type="number" className="input-cashreceipt" name="billNo" readOnly value={data[0]?.billNo || "-"}/></h3>
        </div>
        <div className="row-cashreceipt row6-cashreceipt">
          <h3 className='rsfigure'>Rupees: <input type="text" className="input-cashreceipt" value={data[0]?.grossTotal ? grossTotalWords : "-"} readOnly /></h3>
        </div>
        <div className="row-cashreceipt row7-cashreceipt">
          <h3 className='rupee'>
            <svg className="svg-cashreceipt" fill="#000000" width="20px" height="20px" viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path>
            </svg>
            <input type="number" className="input-cashreceipt rsinput" value={data[0]?.grossTotal || "-"} readOnly />
          </h3>
          <h3 className='for'>For: <input type="text" className="input-cashreceipt" name="forWhat" value={data[0]?.cashreceiptfor || "-"} readOnly /></h3>
        </div>
        <div className="row8-cashreceipt">
          <h3 className="manager">Manager</h3>
        </div>
        <button type="button" className='no-print submit-button' onClick={() => { navigate('/clientDashboard/showCashReceipt  ') }}>
          Back
        </button>
      </form>
    </div>
  );
};

export default CashReceiptPreview;
