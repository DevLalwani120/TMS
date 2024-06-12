import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Invoice.css'
import OverlayTabs from './overlay';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash ,faPlus, faTimes  } from '@fortawesome/free-solid-svg-icons';
import CashReceiptOverlay from './cashReceiptOverlay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdditionalReceiptOverlay from './additionalReceiptOverlay';
import PackingListOverlay from './packingListOverlay';
import AddLedgerOverlay from './addLedgerOverlay';

const Swal = require('sweetalert2')
const Invoice =()=>{
    const navigate = useNavigate();

    
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isCashReceiptOverlayVisible, setCashRecieptOverlayVisible] = useState(false);
    const [isAdditionalReceiptOverlayVisible, setAdditionalReceiptOverlayVisible] = useState(false);
    const [isPackingListOverlayVisible, setPackingListOverlayVisible] = useState(false);
    
    const [grNo, setGrNo] = useState('');
    const [billtyDate, setBilltyDate] = useState('');
    const [companyDetails, setCompanyDetails] = useState({});
    const [rows, setRows] = useState([{ sNo: '', packages: '', description: '', rpq: '', actual: '', charges: '', ftl: '', disableRPQ: false, disableFTL: false ,disableActual:false,disableCharges:false}]);
    const [partyDetails, setPartyDetails] = useState([]);
    const [isConsignorOtherSelected, setIsConsignorOtherSelected] = useState(false);
    const [isConsigneeOtherSelected, setIsConsigneeOtherSelected] = useState(false);
    const [isConsignorLiable, setIsConsignorLiable] = useState(false);
    const [isConsigneeLiable, setIsConsigneeLiable] = useState(false);
    const [freight, setFreight] = useState(0);
  const [billityCharge, setBillityCharge] = useState(0);
  const [kanta, setKanta] = useState(0);
  const [labour, setLabour] = useState(0);
  const [amount,setAmount]=useState(0);
  const [gstRate, setGstRate] = useState('');
  const [gstAmount, setGstAmount] = useState(0);
  const [grossTotal, setGrossTotal] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [netPayable, setNetPayable] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [inputfrom,setInputFrom]=useState('')
  const [inputto,setInputTo]=useState('')
  const [vehicle,setVehicle]=useState('')
  const [frombr,setFromBr]=useState('')
  const [tobr,setToBr]=useState('')
  const [Private,setPrivate]=useState('')
  const [cog,setCog]=useState('')
  const [methodofP,setMethodOfP]=useState('')
  const [invoicenumber,setInvoiceNumber]=useState('')
  const [invoicevalue,setInvoiceValue]=useState('')
  const [eway,setEway]=useState('')
  const [validdate,setValidDate] = useState('')
  const [drivername,setDriverName]=useState('')
  const [drivermob,setDriverMob] = useState('')
  const [isSaved, setIsSaved] = useState(false);
  const [addLedgerVisible, setAddLedgerVisible] = useState(false);
  const [newbiltydate, setnewBiltydate] = useState('');
  const openLedgerOverlay = () => {
    setAddLedgerVisible(true);
  }

  
    const [consignorData, setConsignorData] = useState({
        party: '',
        address: '',
        state: '',
        pincode: '',
        contact: '',
        gstin: ''
    });
    
    const [consigneeData, setConsigneeData] = useState({
        party: '',
        address: '',
        state: '',
        pincode: '',
        contact: '',
        gstin: ''
    });

    const addRow = () => {
    setRows([...rows, { sNo: '', packages: '', description: '', rpq: '', actual: '', charges: '', disableRPQ: false, disableFTL: false ,disableActual:false,disableCharges:false }]);
    };
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const email = sessionStorage.getItem('email'); // or localStorage.getItem('userEmail')
            
            const response = await axios.get('https://tms-server-nt4d.onrender.com/companydetails', {
            headers: {
                'email': email
            }
            });
            console.log(email);
            setCompanyDetails(response.data);
        } catch (error) {
            console.error('Error fetching company details:', error);
        }
        };
        
        fetchData();
    }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;

    // Update disableFTL based on rpq, actual, or charges
    if ((name === 'rpq' || name === 'actual' || name === 'charges') && value) {
        updatedRows[index].disableFTL = true;
    } else if ((name === 'rpq' || name === 'actual' || name === 'charges') && !value) {
        const anyNonEmpty = updatedRows[index].rpq || updatedRows[index].actual || updatedRows[index].charges;
        updatedRows[index].disableFTL = anyNonEmpty;
    }

    // Update disableRPQ, disableActual, and disableCharges based on ftl
    if (name === 'ftl' && value) {
        updatedRows[index].disableRPQ = true;
        updatedRows[index].disableActual = true;
        updatedRows[index].disableCharges = true;
    } else if (name === 'ftl' && !value) {
        updatedRows[index].disableRPQ = false;
        updatedRows[index].disableActual = false;
        updatedRows[index].disableCharges = false;
    }

    setRows(updatedRows);
    if (index === 0) {
        calculateFreight(updatedRows[0]);
      }

};

const calculateFreight = (row) => {
    if (row.ftl) {
      setFreight(row.ftl);
    } else if (row.rpq && row.charges) {
      setFreight(row.rpq * row.charges);
    } else {
      setFreight(0);
    }
  };

  const calculateAmount = () => {
      
    // setAmount(parseFloat(freight) + parseFloat(billityCharge) + parseFloat(kanta) + parseFloat(labour));
      
      return parseFloat(freight) + parseFloat(billityCharge) + parseFloat(kanta) + parseFloat(labour);
  };

  const calculateGST = () => {
    let amount = calculateAmount();
    let gst = 0;

    if (gstRate === '5') {
      gst = (amount * 5) / 100;
    } else if (gstRate === '12') {
      gst = (amount * 12) / 100;
    } else if (gstRate === 'rcm') {
      gst = 0;
    }
    else if (gstRate === 'exempted') {
        gst = 0;
      }

    setGstAmount(gst);
    setGrossTotal(amount + gst);
  };

  const handleAdvanceChange = (e) => {
    setAdvance(parseFloat(e.target.value) || 0);
  };

  useEffect(() => {
    calculateGST();
  }, [freight, billityCharge, kanta, labour, gstRate]);

  useEffect(() => {
    setNetPayable(grossTotal - advance);
  }, [grossTotal, advance]);

  useEffect(() => {
    if (netPayable === 0) {
        setPaymentStatus('paid');
    } else {
        setPaymentStatus('topay');
    }
}, [netPayable]);


        const deleteRow = (index) => {
        const updatedRows = rows.filter((row, i) => i !== index);
                setRows(updatedRows);
            };
        const openOverlay = () => {
                setOverlayVisible(true);
            };
        const closeOverlay = () => {
                setOverlayVisible(false);
            };
        const opencashOverlay = () => {
                setCashRecieptOverlayVisible(true);
            };
        const closecashOverlay = () => {
                setCashRecieptOverlayVisible(false);
            };
        const openAdditionalReceiptOverlay = () => {
                setAdditionalReceiptOverlayVisible(true);
            };
        const closeAdditionalReceiptOverlay = () => {
                setAdditionalReceiptOverlayVisible(false);
            };
        const openPackingListOverlay = () => {
                setPackingListOverlayVisible(true);
            };
        const closePackingListOverlay = () => {
                setPackingListOverlayVisible(false);
            };
            const [selectedPayer, setSelectedPayer] = useState('');

// Update checkbox change handlers
useEffect(() => {
    if (netPayable === 0) {
        setPaymentStatus('paid');
    } else if (paymentStatus === 'paid') {
        setPaymentStatus('topay');
    }
}, [netPayable]);

// Update checkbox change handlers
const handleLiableConsignorChange = (event) => {
    const isChecked = event.target.checked;
    setIsConsignorLiable(isChecked);
    if (isChecked) {
        setIsConsigneeLiable(false); // Uncheck consignee if consignor is checked
    }
    updatePayer(gstRate, true);
};

const handleLiableConsigneeChange = (event) => {
    const isChecked = event.target.checked;
    setIsConsigneeLiable(isChecked);
    if (isChecked) {
        setIsConsignorLiable(false); // Uncheck consignor if consignee is checked
    }
    updatePayer(gstRate, false);
};

const handleGstRateChange = (e) => {
    const rate = e.target.value;
    setGstRate(rate);
    updatePayer(rate, isConsignorLiable);
  };

  const updatePayer = (rate, consignorLiable) => {
    if (rate === "5" || rate === "12") {
      setSelectedPayer("Transporter");
    } else if (rate === "rcm") {
      setSelectedPayer(consignorLiable ? "Consignor" : "Consignee");
    } else if (rate === "exempted") {
      setSelectedPayer("Exempted");
    } else {
      setSelectedPayer("");
    }
  };


const handlePaymentStatusChange = (event) => {
    const { value } = event.target;
    setPaymentStatus(value);
};
            
    useEffect(() => {
        const fetchGrnoAndBilltyDate = async () => {
            try {
                const email = sessionStorage.getItem('email'); 
                if (!email) {
                    throw new Error('Email is not available in session storage');
                }

                const response = await axios.get('https://tms-server-nt4d.onrender.com/getGrnoAndBilltyDate', {
                    headers: {
                        'email': email
                    }
                });

                const { grno, billtydate } = response.data;
                console.log(response.data)
                setGrNo(grno);
                setBilltyDate(billtydate);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchGrnoAndBilltyDate();
    }, []);
    const currentDate = moment().format('YYYY-MM-DD');
  
    const [inputDate, setInputDate] = useState(currentDate);

    const handleDateChange = (event) => {
        setInputDate(event.target.value);
    };
    const handleFromChange =(event) =>{
setInputFrom(event.target.value)
    }
    const handleToChange =(event) =>{
        setInputTo(event.target.value)
            }
           
            const handlebiltySubmit = async (e) => {
                e.preventDefault();
            
                // Check if all required fields are filled
                        if (!inputDate || !vehicle || !inputfrom || !inputto || 
                            !consignorData.party || !consignorData.address || !consignorData.state || !consignorData.pincode || !consignorData.contact || !consignorData.gstin ||
                            !consigneeData.party || !consigneeData.address || !consigneeData.state || !consigneeData.pincode || !consigneeData.contact || !consigneeData.gstin ||
                            !paymentStatus || !gstRate || !grossTotal || !netPayable) {
                            toast.error('Please fill in all the details');
                            return;
                        }
            
                // Get email from session storage
                const email = sessionStorage.getItem('email');
            
                // Validate input date
                const inputDateMoment = moment(inputDate, 'YYYY-MM-DD');
                const billtyDateMoment = moment(billtyDate, 'YYYY-MM-DD');
                if (inputDateMoment.isBefore(billtyDateMoment)) {
                    toast.error(`Date should not be less than the bilty date`);
                    return;
                }
            
                const BiltyformData = {
                    grNo: grNo || null,
                    inputDate: inputDate || null,
                    vehicleno: vehicle || null,
                    inputfrom: inputfrom || null,
                    inputto: inputto || null,
                    frombr: frombr || null,
                    tobr: tobr || null,
                    ConsignorName: consignorData.party || null,
                    consignorAddress: consignorData.address || null,
                    consignoreState: consignorData.state || null,
                    consignorPincode: consignorData.pincode || null,
                    consignorContact: consignorData.contact || null,
                    consignorGstin: consignorData.gstin || null,
                    ConsigneeName: consigneeData.party || null,
                    consigneeAddress: consigneeData.address || null,
                    consigneeState: consigneeData.state || null,
                    consigneePincode: consigneeData.pincode || null,
                    consigneecontact: consigneeData.contact || null,
                    consigneeGstin: consigneeData.gstin || null,
                    paymentStatus: paymentStatus || null,
                    rpq: rows[0]?.rpq || null,
                    actual: rows[0]?.actual || null,
                    charges: rows[0]?.charges || null,
                    ftl: rows[0]?.ftl || null,
                    freight: freight || null,
                    billityCharge: billityCharge || null,
                    kanta: kanta || null,
                    labour: labour || null,
                    amount: amount || null,
                    gstAmount: gstAmount || null,
                    gstRate: gstRate || null,
                    grossTotal: grossTotal || null,
                    advance: advance || null,
                    netPayable: netPayable || null,
                    Private: Private || null,
                    classificationOfGoods: cog || null,
                    methodofP: methodofP || null,
                    invoicenumber: invoicenumber || null,
                    invoicevalue: invoicevalue || null,
                    eway: eway || null,
                    validdate: validdate || null,
                    GSTPayer: selectedPayer || null,
                    drivername: drivername || null,
                    drivermob: drivermob || null,
                    clientEmail: email || null,
                    rows:rows || null

};
            
                try {
                    const response = await axios.post('https://tms-server-nt4d.onrender.com/savebillty', BiltyformData);
                    if (response && response.status === 200) {
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'bilty saved Successfully',
                            showConfirmButton: false,
                            timer: 3000 
                          });
                        
                        setIsSaved(true);
                       
                    } else {
                        toast.error('Error saving bilty data');
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                    toast.error('Error submitting form');
                }
            };
            
            const handleNextBilty = () => {
                window.location.reload();
            };
        
            
const fetchParties = async () => {
 try {
const email = sessionStorage.getItem('email'); 
              const response = await axios.get('https://tms-server-nt4d.onrender.com/parties', {
                    headers: {
                      'x-client-email': email 
                    }
                  });
                  console.log(response);
                  setPartyDetails(response.data);
                } catch (error) {
                  console.error('Error fetching parties:', error);
                }
              };
    useEffect(() => {
      fetchParties();
    }, []);
    const closeLedgerOverlay = () => {
        setAddLedgerVisible(false);
        fetchParties(); 
      };

    const handleConsignorChange = (e) => {
      const { name, value } = e.target;
      if (name === 'party') {
          setIsConsignorOtherSelected(value === 'Other');
          if (value !== 'Other') {
              const selected = partyDetails.find(p => p.name === value);
              setConsignorData({
                  ...consignorData,
                  ...selected,
                  party: value
              });
          } else {
              setConsignorData({
                  address: '',
                  state: '',
                  pincode: '',
                  contact: '',
                  gstin: ''
              });
              
          }
      } else {
          setConsignorData(prevState => ({ ...prevState, [name]: value }));
      }
  };    

  const handleConsigneeChange = (e) => {
      const { name, value } = e.target;
      if (name === 'party') {
          setIsConsigneeOtherSelected(value === 'Other');
          if (value !== 'Other') {
              const selected = partyDetails.find(p => p.name === value);
              setConsigneeData({
                  ...consigneeData,
                  ...selected,
                  party: value
              });
          } else {
              setConsigneeData({
                  address: '',
                  state: '',
                  pincode: '',
                  contact: '',
                  gstin: ''
              });
          }
      } else {
          setConsigneeData(prevState => ({ ...prevState, [name]: value }));
      }
  };


  useEffect(() => {
    // Simulate fetching biltydate from the database
    const fetchBiltydate = async () => {
      // Replace this with actual database fetch logic
      const billtyDateMomentt = moment(billtyDate, 'YYYY-MM-DD');
console.log(billtyDateMomentt);

      setnewBiltydate(billtyDateMomentt);
    };

    fetchBiltydate();
  }, []);
  
    return(
        <>
        <form  className="biltyForm"  >
            
        <div className='invoice-container'>
        <div className='invoice-row-0'>
                <h2 className='invoice-heading'>{companyDetails.company_name}, {companyDetails.ho_address}, {companyDetails.ho_city}, {companyDetails.ho_state}, {companyDetails.ho_pin_code}</h2>
                <div className='overlayTabs'>
                <button type='button' onClick={openOverlay}>Additional Information</button>
                <OverlayTabs docketno={grNo} isVisible={isOverlayVisible} onClose={closeOverlay} />    
                <button type='button' onClick={opencashOverlay}>Cash Receipt</button>

                <CashReceiptOverlay isVisible={isCashReceiptOverlayVisible} docketno={grNo} from ={inputfrom} to={inputto} grossTotal={grossTotal} billtyDate={inputDate} onClose={closecashOverlay} /> 
                <button type='button' onClick={openAdditionalReceiptOverlay}>Additional Receipt</button>
                <AdditionalReceiptOverlay isVisible={isAdditionalReceiptOverlayVisible}  grossTotal={grossTotal} videlr={grNo} billtyDate={inputDate} from ={inputfrom} to={inputto} consignorName={consignorData.party} onClose={closeAdditionalReceiptOverlay} />
                <button type='button' onClick={openPackingListOverlay}>Packing List</button>
                <PackingListOverlay isVisible={isPackingListOverlayVisible} from ={inputfrom} to={inputto} docketno={grNo} consigneeName={consigneeData.party} consignorName={consignorData.party} onClose={closePackingListOverlay} date={inputDate}/>    
                </div>
                </div>
                <div className='invoice-row-1'>
                <div>
                        <label className="invoice-label-row1" htmlFor="gr_number">GR Number<span className="red">*</span></label>
                        <input
                            className="invoice-input-row1"
                            type="number"
                            id="gr_number"
                            name="gr_number"
                            value={grNo}
                            onChange={(e) => setGrNo(e.target.value)}
                            placeholder="GR No."
                            disabled
                        />
                    </div>
                    <div>
                        <label className="invoice-label-row1" htmlFor="invoicedate">Date<span className="red">*</span></label>
                        <div className="date-selector">
                        <input
          className={`invoice-input-row1 ${inputDate === currentDate ? 'current-date' : 'previous-date'}`}
          type="date"
          id="invoicedate"
          name="invoicedate"
          value={inputDate}
          onChange={handleDateChange}
          min={newbiltydate}
          max={currentDate}
        />
      </div>
</div>
            <div>
            <label className="invoice-label-row1" htmlFor="vehicle_number">Vehicle Number<span className="red">*</span></label>
            <input className="invoice-input-row1" type="text" id="vehicle_number" name="vehicle_number" placeholder="Vehicle No."  value={vehicle}  onChange={(e) => setVehicle(e.target.value)} required /></div>
            <div>
            <label className="invoice-label-row1" htmlFor="from">From<span className="red">*</span></label>
            <input className="invoice-input-row1" type="text" id="from" name="from" placeholder="City"  onChange={handleFromChange} value={inputfrom} required /></div>
            <div>
            <label className="invoice-label-row1" htmlFor="fbrcode">Br. code</label>
            <input className="invoice-input-row1" type="number" id="fbrcode" name="fbrcode" placeholder="BR Code" value={frombr} onChange={(e) => setFromBr(e.target.value)} required />
            </div>
            <div>
            <label className="invoice-label-row1" htmlFor="to">To<span className="red">*</span></label>
            <input className="invoice-input-row1" type="text" id="to" name="to" placeholder="City" onChange={handleToChange} value={inputto} required /></div>
            <div>
            <label className="invoice-label-row1" htmlFor="tbrcode">Br. code</label>
            <input className="invoice-input-row1" type="number" id="tbrcode" name="tbrcode" placeholder="BR Code" value={tobr} onChange={(e) => setToBr(e.target.value)}  required />
            </div>
            </div>
            <div className="invoice-row-2">
            <div className="row-2-left">
                <div className='consignor'>
                    <div className='liable'>
                        <h4 className='consignorheader'>Consignor</h4>
                        <div>
      <button  type='button' onClick={() => setAddLedgerVisible(true)}>Add Consignor</button>
      <AddLedgerOverlay isVisible={addLedgerVisible} onClose={closeLedgerOverlay} />
    </div>
                        <h4 className='consignorheader'>
                            Liable to pay
                            <input
                                type="checkbox"
                                id="consignor"
                                name="consignor"
                                value="consignor"
                                checked={isConsignorLiable}
                                onChange={handleLiableConsignorChange}
                            />
                        </h4>
                    </div>
                  
                      
                    
                        <select className='partyname' name="party" onChange={handleConsignorChange} value={consignorData.party}>
                            <option value="">Select Consignor</option>
                            {partyDetails.map((party) => (
                                <option key={party.id} value={party.name}>{party.name}</option>
                            ))}
                           
                        </select>
                    
                    <div className='address'>
                        <label htmlFor="address">Address<span className="red">*</span></label>
                        <input
                            className="consignoraddress"
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter Address"
                            value={consignorData.address}
                            onChange={handleConsignorChange}
                            required
                        />
                    </div>
                    <div className='col1'>
                        <div className='state'>
                            <label htmlFor="state">State<span className="red">*</span></label>
                            <input
                                className="consignorinput"
                                type="text"
                                id="state"
                                name="state"
                                placeholder="Enter State"
                                value={consignorData.state}
                                onChange={handleConsignorChange}
                                required
                            />
                        </div>
                        <div className='pin_code'>
                            <label htmlFor="pin_code">Pincode<span className="red">*</span></label>
                            <input
                                className="consignorinput mediainput"
                                type="number"
                                min={100000}
                                max={999999}
                                id="pin_code"
                                name="pincode"
                                placeholder="Enter Pincode"
                                value={consignorData.pincode}
                                onChange={handleConsignorChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='consignorcol2'>
                        <div>
                            <label htmlFor="contact">Contact<span className="red">*</span></label>
                            <input
                                className="consignorinput"
                                type="number"
                                id="contact"
                                name="contact"
                                placeholder="Enter Contact"
                                value={consignorData.contact}
                                onChange={handleConsignorChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="gstin">GSTIN<span className="red">*</span></label>
                            <input
                                className="consignorinput mediainput"
                                type="text"
                                id="gstin"
                                name="gstin"
                                placeholder="Enter GSTIN"
                                value={consignorData.gstin}
                                onChange={handleConsignorChange}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-2-middle">
                <div className='consignor'>
                    <div className='liable'>
                        <h4 className='consignorheader'>Consignee</h4>
                        <div>
      <button type='button' onClick={() => setAddLedgerVisible(true)}>Add Consignee</button>
      <AddLedgerOverlay isVisible={addLedgerVisible} onClose={closeLedgerOverlay} />
    </div>
                        <h4 className='consignorheader'>
                            Liable to pay
                            <input
                                type="checkbox"
                                id="consignee"
                                name="consignee"
                                value="consignee"
                                checked={isConsigneeLiable}
                                onChange={handleLiableConsigneeChange}
                            />
                        </h4>
                    </div>
                    
                        <select className="partyname" name="party" onChange={handleConsigneeChange} value={consigneeData.party}>
                            <option value="">Select Consignee</option>
                            {partyDetails.map((party) => (
                                <option key={party.id} value={party.name}>{party.name}</option>
                            ))}
                            
                        </select>

                    <div className='address'>
                        <label htmlFor="conaddress">Address<span className="red">*</span></label>
                        <input
                            className="consignoraddress"
                            type="text"
                            id="conaddress"
                            name="address"
                            placeholder="Enter Address"
                            value={consigneeData.address}
                            onChange={handleConsigneeChange}
                            required
                        />
                    </div>
                    <div className='col1'>
                        <div className='state'>
                            <label htmlFor="constate">State<span className="red">*</span></label>
                            <input
                                className="consignorinput"
                                type="text"
                                id="constate"
                                name="state"
                                placeholder="Enter State"
                                value={consigneeData.state}
                                onChange={handleConsigneeChange}
                                required
                            />
                        </div>
                        <div className='pin_code'>
                            <label htmlFor="conpin_code">Pincode<span className="red">*</span></label>
                            <input
                                className="consignorinput mediainput"
                                type="number"
                                min={100000}
                                max={999999}
                                id="conpin_code"
                                name="pincode"
                                placeholder="Enter Pincode"
                                value={consigneeData.pincode}
                                onChange={handleConsigneeChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='col2'>
                        <div>
                            <label htmlFor="concontact">Contact<span className="red">*</span></label>
                            <input
                                className="consignorinput"
                                type="number"
                                id="concontact"
                                name="contact"
                                placeholder="Enter Contact"
                                value={consigneeData.contact}
                                onChange={handleConsigneeChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="congstin">GSTIN<span className="red">*</span></label>
                            <input
                                className="consignorinput mediainput"
                                type="text"
                                id="congstin"
                                name="gstin"
                                placeholder="Enter GSTIN"
                                value={consigneeData.gstin}
                                onChange={handleConsigneeChange}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
                <div className="row-2-right">
                <label className='paymentstatusheader'>Payment Status</label>
                <div className='paymentstatus'>
                <h4 className='paymentstatusamount'>Gross Total - {grossTotal}</h4>
                <h4 className='paymentstatusamount'>Advance - {advance}</h4>
                <h4 className='paymentstatusamount'>Net Payable - {netPayable}</h4>
                </div>
                <div className='status'>
                    <label className='payer'>Frieght Payer -  {isConsignorLiable ? consignorData.party : isConsigneeLiable ? consigneeData.party : 'None'}</label>
                    <h4 className='paymentstatusamount'>
                        <input type="checkbox" id="paid" name="paid" value="paid" checked={paymentStatus === 'paid'} onChange={handlePaymentStatusChange} disabled={netPayable > 0} /> Paid
                    </h4>
                    <h4 className='paymentstatusamount'>
                        <input type="checkbox" id="topay" name="topay" value="topay" checked={paymentStatus === 'topay'} onChange={handlePaymentStatusChange} disabled={netPayable === 0} /> To Pay
                    </h4>
                    <h4 className='paymentstatusamount'>
                        <input type="checkbox" id="tbb" name="tbb" value="tbb" checked={paymentStatus === 'tbb'} onChange={handlePaymentStatusChange} disabled={netPayable === 0} /> TBB
                    </h4>
                    <label className='gstpayer'>GST Payer -  {selectedPayer?selectedPayer:"None"}</label>
                </div>
                </div></div>
                
            </div>
            <div className="invoice-row-3">
      <table className='billitytable'>
        <thead>
          <tr className='billitytr'>
            <th className='billityth'>#</th>
            <th className='billityth'>S.no</th>
            <th className='billityth'>Packages<span className="red">*</span></th>
            <th className='billityth'>Description<span className="red">*</span></th>
            <th className='billityth'>Rate/QTL</th>
            <th className='billityth'>A. Weight</th>
            <th className='billityth'>C. Weight</th>
            <th className='billityth'>FTL</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr className='billitytrparticulars' key={index}>
              <td className='action'>
                {rows.length > 1 && (
                  <button onClick={() => deleteRow(index)} className="delete-row-button">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
                {index === rows.length - 1 && (
                  <button onClick={addRow} className="add-row-button">
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </td>
              <td className='s.no bilitytd'>{index + 1}</td>
              <td className='packages bilitytd'><input className="bilityinput bilityinput-package" type='text' name='packages' placeholder='Packages ' value={row.packages} onChange={(e) => handleInputChange(index, e)} /></td>
              <td className='description bilitytd'><input className="bilityinput bilityinput-description" placeholder='Description' type='text' name='description' value={row.description} onChange={(e) => handleInputChange(index, e)} /></td>
              <td className='rpq bilitytd'>{index === 0 ? (<input className="bilityinput" type='number' name='rpq' value={row.rpq} onChange={(e) => handleInputChange(index, e)} disabled={row.disableRPQ} />) : ('-')}</td>
              <td className='actual bilitytd'>{index === 0 ? (<input className="bilityinput" type='number' name='actual' value={row.actual} onChange={(e) => handleInputChange(index, e)} disabled={row.disableActual} />) : ('-')}</td>
              <td className='charges bilitytd'>{index === 0 ? (<input className="bilityinput" type='number' name='charges' value={row.charges} onChange={(e) => handleInputChange(index, e)} disabled={row.disableCharges} />) : ('-')}</td>
              <td className='ftl bilitytd'>{index === 0 ? (<input className="bilityinput" type='number' name='ftl' value={row.ftl} onChange={(e) => handleInputChange(index, e)} disabled={row.disableFTL} />) : ('-')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='bilitytable2'>
        <thead>
          <tr className="bilitytr">
            <th className='billityth freightwdth'>Freight</th>
            <th className='billityth biltywdth'>Bilty</th>
            <th className='billityth'>Kanta</th>
            <th className='billityth'>Labour</th>
            <th className='billityth'>Amount</th>
            <th className='billityth' colSpan="2">GST<span className="red">*</span></th>
            <th className='billityth'>G. Total</th>
            <th className='billityth'>Advance</th>
            <th className='billityth'>N. Payable</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bilitytr">
            <td className='bilitytd'>{freight}</td>
            <td className='bilitytd'><input type='number'  className='bilityinput'  value={billityCharge} onChange={(e) => setBillityCharge(parseFloat(e.target.value) || 0)} /></td>
            <td className='bilitytd'><input type='number'  className='bilityinput' value={kanta} onChange={(e) => setKanta(parseFloat(e.target.value) || 0)} /></td>
            <td className='bilitytd'><input type='number'  className='bilityinput' value={labour} onChange={(e) => setLabour(parseFloat(e.target.value) || 0)} /></td>
            <td className='bilitytd' value={amount} bilityinput  onChange={(e) => setAmount(e.target.value)}>{calculateAmount()}</td>
            <td className='bilitytd'>
            <select className="gstrate" name="gstrate" id="gstrate" value={gstRate} onChange={handleGstRateChange}>
                <option value="">Select GST Rate</option>
                <option value="5">GST @ 5%</option>
                <option value="12">GST @ 12%</option>
                <option value="rcm">GST under RCM</option>
                <option value="exempted">GST Exempted</option>
              </select>
            </td>
            <td className='bilitytd'>{gstAmount}</td>
            <td className='bilitytd'>{grossTotal}</td>
            <td className='bilitytd'><input type='number' value={advance}  className='bilityinput' onChange={handleAdvanceChange} /></td>
            <td className='bilitytd'>{netPayable}</td>
          </tr>
        </tbody>
      </table>
    </div>
                    <div className="invoice-row-4">
                    <table className='billitytable'>
                        <tr className='billitytr'>
                        <th className='billityth'>Private Marks</th>
                            <th className='billityth'>Goods Classification</th>
                            <th className='billityth'>Method of Packing</th>
                            <th className='billityth'>Invoice No.</th>
                            <th className='billityth'>Invoice Value</th>
                            <th className='billityth'>E-Way Bill No</th>
                            <th className='billityth'>Valid Up To</th>
                            <th className='billityth'>GST Payer<span className="red">*</span></th>
                        </tr>
                        <tr className='billitytr'>
                            <td className='privatemarks bilitytd'><input className="bilityinput" type='text' placeholder='Private Marks' value={Private} onChange={(e) => setPrivate(e.target.value)} ></input></td>
                            <td className='goods bilitytd'><input className="bilityinput" type='text' placeholder='Classification of Goods' value={cog} onChange={(e) => setCog(e.target.value)} ></input></td>
                            <td className='mop bilitytd'><input className="bilityinput" type='text' placeholder='Method of Packing' value={methodofP} onChange={(e) => setMethodOfP(e.target.value)} ></input></td>
                            <td className='inoviceno bilitytd'><input className="bilityinput" type='text' placeholder='Invoice No' value={invoicenumber} onChange={(e) => setInvoiceNumber(e.target.value)} ></input></td>
                            <td className='inovicevalue bilitytd'><input className="bilityinput" type='text' placeholder='Invoice Value' value={invoicevalue} onChange={(e) => setInvoiceValue(e.target.value)} ></input></td>
                            <td className='eway bilitytd'><input className="bilityinput" type='text' placeholder='E-Way Bill No' value={eway} onChange={(e) => setEway(e.target.value)} ></input></td>
                            <td className='Valid bilitytd'><input className="bilityinput" type='date' placeholder='Valid up to' value={validdate} onChange={(e) => setValidDate(e.target.value)} ></input></td>
                            <td className='bilitytd'>
                            <select className="gstpay" name="gstpayer" id="gstpayer" value={selectedPayer} disabled>
                            <option value="">Select Payer</option>
                            <option value="Consignor">Consignor</option>
                            <option value="Consignee">Consignee</option>
                            <option value="Transporter">Transporter</option>
                            <option value="Exempted">Exempted</option>
                            </select>
        </td>
                        </tr>
                        
                    </table>
                    </div>
                    <div className="invoice-row-5">
                        <table className='driverdetails'>
                            <tr className="bilitytr">
                    <th className='drivername billityth'>Driver Name</th>
                    <th className='drivermobile billityth'>Mobile No.</th>
                    </tr>
                    <tr className="bilitytr">
                        <td className='bilitytd'><input type='text' className='bilityinput' name='drivername' id='drivername' value={drivername} onChange={(e) => setDriverName(e.target.value)} /></td>
                       <td className='bilitytd'> <input type='text' className='bilityinput' name='drivermobile' id='drivermobile' value={drivermob} onChange={(e) => setDriverMob(e.target.value)} /></td>
                    </tr>
</table> 

<div>

<table className='Bank-details'>
    <tr className="bilitytr">
        <th className='billityth'>Bank Name</th>
        <th className='billityth'>Bank Account No</th>
        <th className='billityth'>IFSC</th>
    </tr>
    <tr className="bilitytr">
        <td className='bilitytd'>{companyDetails.bank_name}</td>
        <td className='bilitytd'>{companyDetails.bank_account_no}</td>
        <td className='bilitytd'>{companyDetails.ifsc}</td>
        </tr>
</table>
</div>
                    </div>
                    <button className='savebuttonbilty' id="saveBtn" type='button' onClick={handlebiltySubmit} disabled={isSaved}> save</button>
                    {isSaved && <button className='savebuttonbilty' type='button' onClick={()=>{navigate('/preview-invoice', { state: { grNo } })}}>Preview</button>}
                    {isSaved && <button  className='savebuttonbilty' onClick={handleNextBilty}>Next Bilty</button>}
                    </form>
                   
                    <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={false}  
            
        />
                      
        </>
    )
}
export default Invoice;