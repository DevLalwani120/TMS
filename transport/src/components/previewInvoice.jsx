import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import '../styles/PreviewInvoice.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PreviewInvoice = () => {
  const [data, setData] = useState(null);
  const [clientsdata, setClients] = useState([]);
  const [packinglist, setPackingList] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); 
  const { grNo } = location.state || {};

  const fetchClients = async () => {
    try {
      const email = sessionStorage.getItem('email');
      if (email) {
        const response = await axios.get('https://tms-server-nt4d.onrender.com/showclientdetails', {
          headers: { 'x-client-email': email }
        });
        setClients(response.data);
      }
    } catch (error) {
      console.error('Error fetching parties:', error);
      setError('Error fetching client details.');
    }
  };

  const fetchData = async () => {
    try {
      const email = sessionStorage.getItem('email');
      if (email) {
        const response = await axios.get('https://tms-server-nt4d.onrender.com/getbiltypreview', {
          params: { grNo, clientemail: email }
        });
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching bilty preview data.');
    }
  };

  const fetchPackingList = async () => {
    try {
      const response = await axios.get(`https://tms-server-nt4d.onrender.com/getpackinglist/${grNo}`);
      setPackingList(response.data);
    } catch (error) {
      console.error('Error fetching packing list data:', error);
      setError('Error fetching packing list data.');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    fetchData();
  }, [grNo]);

  useEffect(() => {
    fetchPackingList();
  }, [grNo]);

  if (!data || !clientsdata.length || !packinglist) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const insurancedateMoment = moment(data[0].insurancedate);

// Format the date to 'YYYY-MM-DD'
const insuranceformattedDate = insurancedateMoment.format('DD-MMMM-YYYY');

const biltydatemoment=moment(data[0].billtydate)
const biltydateformattedDate=biltydatemoment.format('DD-MMMM-YYYY')

  return (
    <div className="preview-invoice-box">
      <table>
        <thead>
          <tr>
            <th colSpan="6" className="preview-title">
              {clientsdata[0].company_name}<button  className='no-print previewbtn' onClick={() => window.print()}><FontAwesomeIcon icon={faPrint} size="lg"/></button>
              <p>Head Office: {clientsdata[0].ho_address}, {clientsdata[0].ho_city}, {clientsdata[0].ho_state}, {clientsdata[0].ho_pin_code}<br />
                Contact: {clientsdata[0].contact_no}, {clientsdata[0].email}</p>
            </th>
          </tr>
          <tr>
            <th colSpan="2" style={{ textAlign: 'center' }}>
              <select className='selectcopy '>
                <option>Consignor Copy</option>
                <option>Consignee Copy</option>
                <option>Transportar Copy</option>
                <option>Driver Copy</option>
              </select>
            </th>
            <th colSpan="4" style={{ textAlign: 'right' }}>GSTIN: {clientsdata[0].gstin}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="1" className='width-row1-col1'>
              <span className="preview-para-heading">SCHEDULE OF DEMURRAGE CHARGES </span>
              <p>Demurrage Chargeable after {data[0].days ? data[0].days : "___"} days from today @ Rs. {data[0].rate ? data[0].rate : "0"} per day per Qtl. on weight charged.</p>
              <span className="preview-para-heading">NOTICE</span>
              <p>The consignment covered by this Lorry Receipt
              shall be stored at the destination under the control
              of the Transport Operator and shall be delivered to
              or to the order of the Consignee Bank whose Name
              is Mentioned in the Lorry Receipt.It will under no
              circumstances be delivered to anyone without the
              written authority from the Consignee Bank or its
              order, endorsed on the consignee copy.</p>
              <span className="preview-para-heading">CAUTION</span>
              <p>This Consignment will not be detained,
              diverted, re-routed or re-booked without
              Consignee Bank's written permission</p>
            </td>
            <td colSpan="1" className="preview-preformatted width-row1-col2">
            <span className="preview-para-heading">AT CARRIER'S RISK</span>
            <span className="preview-para-heading">INSURANCE</span>
              <span className="preview-para-heading">The consignor has stated that  he has insured the consignment</span>
              <div>
              <p>Company : {data[0].company ? data[0].company : "-"}</p>
              <p>Policy No : {data[0].policyNo ? data[0].policyNo : "-"}</p>
              <p>Amount : {data[0].insuranceamount ? data[0].insuranceamount : "-"}</p>
              <p>Date : {data[0].insurancedate ? insuranceformattedDate : "-"}</p>
              <p>Risk : {data[0].risk ? data[0].risk : "-"}</p>
              </div>
            </td>
            <td colSpan="1" className='width-row1-col3'>
            <span className="preview-para-heading">Will be delivered at the destination</span>
              <span className="preview-para-heading">Address of delivery office </span>

              <p>{data[0].deiveryofficeaddress ? data[0].deiveryofficeaddress : "-"}</p>
              <p>State: {data[0].deiveryofficestate ? data[0].deiveryofficestate : "-"}</p>
              <p>Tel : {data[0].deiveryofficetel ? data[0].deiveryofficetel : "-"}</p>
              <span className="preview-para-heading">Address of Issuing office</span>
              <p>Name : {data[0].agentName ? data[0].agentName : "-"}</p>
              <p>Address : {data[0].agentaddress ? data[0].agentaddress : "-"}</p>
            </td>
            <td colSpan="2" className="preview-preformatted">
              <span className="preview-para-heading">CONSIGNMENT NOTE</span>
              <div>
                <p>No. {data[0].grNo}</p>
                <p>Date {biltydateformattedDate}</p>
                <p>From {data[0].inputfrom}</p>
                <p>To {data[0].inputto}</p>
                <p>TRUCK NO: {data[0].vehicleno}</p>
                <span className="preview-para-heading">Additional Information</span>
              <p>Private Marks:{data[0].Private}</p>
              <p>Classification of Goods : {data[0].classificationOfGoods}</p>
              <p className="preview-mop">Method of Packing :{data[0].methodofP}</p>
              </div>
              
            </td>
            
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <td colSpan="1" className="preview-preformatted width-row2-col1">
              <span className="preview-para-heading">Consignor's Name & Address</span>
              <textarea cols="60" rows="6" className="preview-abc">
                {`${data[0].ConsignorName},
${data[0].consignorAddress},
${data[0].consignoreState},
${data[0].consignorPincode},
${data[0].consignorContact}
${data[0].consignorGstin}`}
              </textarea>
            </td>
            <td colSpan="3" className="preview-preformatted width-row2-col2">
              <span className="preview-para-heading">Consignee's Name & Address</span>
              <textarea cols="60" rows="6" className="preview-abc">
                {`${data[0].ConsigneeName},
${data[0].consigneeAddress},
${data[0].consigneeState},
${data[0].consigneePincode},
${data[0].consigneecontact}
${data[0].consigneeGstin}`}
              </textarea>
            </td>
            <td>
              <p>Invoice No.- {data[0].invoicenumber}</p>
              <p>License No. of Transport operator - </p> 
            </td>
          </tr>
        </thead>
      </table>
      <table className="preview-packinglisttable">
        <thead>
          <tr>
            <th rowSpan="2" className='tablepackwidth'>Packages</th>
            <th rowSpan="2" className='descripwidth'>Description (Said to Contain)</th>
            <th colSpan="3" >Weight</th>
            <th rowSpan="2" className='rate'>Rate</th>
            <th rowSpan="2" className='amtpaid'>Amount to Pay/Paid</th>
            <th rowSpan='2'>GST/Unique ID Tax Reg. No. of Person Liable to pay </th>
          </tr>
          <tr>
            <th className='actualwidth'>Actual</th>
            <th className='charges'>Charges</th>
            <th className='ftl'>Full Truck Load</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan='8'>
              {packinglist.packingList.map((item, index) => (
                <p key={index}>{item.packages}</p>
              ))}
            </td>
            <td rowSpan={8}>
              {packinglist.packingList.map((item, index) => (
                <p key={index}>{item.description}</p>
              ))}
            </td>
            <td>{data[0].actual?data[0].actual:"-"}</td>
            <td>{data[0].charges?data[0].charges:"-"}</td>
            <td>{data[0].ftl?data[0].ftl:"-"}</td>
            <td>Freight</td>
            <td>{data[0].freight}</td>
            <td rowSpan={8}>
              <div className='status'>
                    <label className='Consignor'></label>
                    <h4 className='payerr'>
                        <input type="checkbox" id="Consignor" name="Consignor" value="Consignor" /> Consignor
                    </h4>
                    <h4 className='payerr'>
                        <input type="checkbox" id="Consignee" name="Consignee" value="Consignee" /> Consignee
                    </h4>
                    <h4 className='payerr'>
                        <input type="checkbox" id="Transportar" name="Transportar" value="Transportar" /> Transportar
                    </h4>
                    <h4 className='payerr'>
                        <input type="checkbox" id="Exempted" name="Exempted" value="Exempted" /> GST Exempted
                    </h4>
                </div></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Labour</td>
            <td>{data[0].labour?data[0].labour:"-"}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Kanta</td>
            <td>{data[0].kanta?data[0].kanta:"-"}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Bilty Charges</td>
            <td>{data[0].billityCharge?data[0].billityCharge:"-"}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>GST @ {data[0].gstRate}%</td>
            <td>{data[0].gstAmount?data[0].gstAmount:"-"}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Gross Total</td>
            <td>{data[0].grossTotal?data[0].grossTotal:"-"}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Advance</td>
            <td>{data[0].advance?data[0].advance:"-"}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Net Payable</td>
            <td>{data[0].netPayable}</td>
            
          </tr>
        </tbody>
        
      </table>
      <div className="cont">
        <p>Value: {data[0].invoicevalue?data[0].invoicevalue:'-'}</p>
      <button  className='no-print savebuttonpreview' onClick={() => navigate('/clientDashboard/showBillty')}>Back</button>
        <p>Signature of the Transport Operator</p>
      </div>
      
    </div>
  );
};

export default PreviewInvoice;
