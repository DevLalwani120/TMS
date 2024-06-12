import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/additionalReceipt.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faPrint } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import moment from 'moment/moment';

const AdditionalReceiptPreview = () => {
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
          const response = await axios.get('https://tms-server-nt4d.onrender.com/getadditionalcashreceiptpreview', {
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

    const biltydatemoment=moment(data[0]?.biltydate)
    const biltydateformattedDate=biltydatemoment.format('DD-MMMM-YYYY')
    const additionalcashdatemoment=moment(data[0]?.additionalreceiptdate)
    const additionalcashdateformattedDate=additionalcashdatemoment.format('DD-MMMM-YYYY')

    return (
        <div className="additional-receipt-container">
            <div className="receipt-menu-head">
            <div>
          <h2>{companyDetails?.company_name}<button  className='no-print previewbtn' onClick={() => window.print()}><FontAwesomeIcon icon={faPrint} size="lg"/></button></h2>
          <h3 className='upperdata'>Head Office: {companyDetails?.ho_address}, {companyDetails?.ho_city}, {companyDetails?.ho_state}, {companyDetails?.ho_pin_code}</h3>
          <h3 className='upperdata'>Contact: {companyDetails?.contact_no}, {companyDetails?.email}</h3>
        </div>
                <h1 className="receipt-menu-header">Additional Receipt</h1>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    Receipt Number <input type="number" value={data[0]?.additionalreceiptno} disabled />
                </h3>
                <h3 className="receipt-menu-header">
                    Date <input type="text" name="date" value={additionalcashdateformattedDate} required />
                </h3>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    Received with thanks from Mr./Mrs <input type="text" name="receivedFrom" value={data[0]?.additionalreceiptreceivedfrom} required />
                </h3>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    Rupees <input type="text" value={data[0]?.additionalreceiptrupees} readOnly />
                </h3>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    Being The Freight Charges From <input type="text" value={data[0]?.additionalreceiptfrom} readOnly />
                </h3>
                <h3 className="receipt-menu-header">
                    To <input type="text" value={data[0]?.additionalreceiptto} readOnly />
                </h3>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    Vide L/R Number <input type="number" value={data[0]?.grno} readOnly />
                </h3>
                <h3 className="receipt-menu-header">
                    Date <input type="text" value={biltydateformattedDate} readOnly /> as details below:
                </h3>
            </div>
            <div className="receipt-menu-table">
                <table>
                    <thead>
                        <tr>
                            <th>Particulars</th>
                            <th><FontAwesomeIcon icon={faIndianRupeeSign} /></th>
                            <th>Particulars</th>
                            <th><FontAwesomeIcon icon={faIndianRupeeSign} /></th>
                            <th>Particulars</th>
                            <th><FontAwesomeIcon icon={faIndianRupeeSign} /></th>
                            <th>Particulars</th>
                            <th><FontAwesomeIcon icon={faIndianRupeeSign} /></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Freight</td>
                            <td><input type="number" name="freight"  value={data[0]?.frieght} readOnly /></td>
                            <td>Transportation</td>
                            <td><input type="number" name="transportation"  value={data[0]?.transportation} readOnly /></td>
                            <td>Packing</td>
                            <td><input type="number" name="packing"  value={data[0]?.packing} readOnly /></td>
                            <td>Loading</td>
                            <td><input type="number" name="loading"  value={data[0]?.loading} readOnly /></td>
                        </tr>
                        <tr>
                            <td>Unloading</td>
                            <td><input type="number" name="unloading"  value={data[0]?.unloading} readOnly /></td>
                            <td>Unpacking</td>
                            <td><input type="number" name="unpacking"  value={data[0]?.unpacking} readOnly /></td>
                            <td>Insurance</td>
                            <td><input type="number" name="insurance"  value={data[0]?.insurance} readOnly /></td>
                            <td>Bike Charges</td>
                            <td><input type="number" name="bikeCharges"  value={data[0]?.bikecharges} readOnly /></td>
                        </tr>
                        <tr>
                            <td>Car Transportation</td>
                            <td><input type="number" name="carTransportation"  value={data[0]?.cartransportation} readOnly /></td>
                            <td>GSTIN</td>
                            <td><input type="number" name="gstin"  value={data[0]?.gstin} readOnly /></td>
                        </tr>
                        <tr>
                            <td colSpan="2">Total</td>
                            <td colSpan="2"><input className="table-total" type="number" name="total"  value={data[0]?.total} readOnly /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    For: <input type="text" name="additionalReceiptFor"  value={data[0]?.additionalreceiptfor} readOnly  />
                </h3>
            </div>
            <button type="button" className='no-print submit-button' onClick={() => { navigate('/clientDashboard/showAdditionalCashReceipt') }}>
          Back
        </button>
        </div>
    );
};

export default AdditionalReceiptPreview;
