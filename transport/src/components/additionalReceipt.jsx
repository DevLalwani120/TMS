import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/additionalReceipt.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import numberToWords from '@jstb/num-to-words-indian';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const AdditionalReceipt = ({ billtyDate, videlr, grossTotal, from, to, consignorName }) => {
    const grossTotalWords = `${numberToWords(grossTotal)} rupees only`;
    const [companyDetails, setCompanyDetails] = useState({});
    const [additionalReceiptNo, setAdditionalReceiptNo] = useState('');
    const [formData, setFormData] = useState({
        date: '',
        receivedFrom: '',
        freight: '',
        transportation: '',
        packing: '',
        loading: '',
        unloading: '',
        unpacking: '',
        insurance: '',
        bikeCharges: '',
        carTransportation: '',
        gstin: '',
        total: '',
        additionalReceiptFor: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const email = sessionStorage.getItem('email');
                const response = await axios.get('https://tms-server-nt4d.onrender.com/companydetails', {
                    headers: { email }
                });
                setCompanyDetails(response.data);
            } catch (error) {
                console.error('Error fetching company details:', error);
            }
        };
        fetchCompanyDetails();
    }, []);

    useEffect(() => {
        const fetchAdditionalReceiptNo = async () => {
            try {
                const email = sessionStorage.getItem('email');
                if (!email) throw new Error('Email is not available in session storage');

                const response = await axios.get('https://tms-server-nt4d.onrender.com/getadditionalreceiptno', {
                    headers: { email }
                });
                setAdditionalReceiptNo(response.data.additionalreceiptno);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchAdditionalReceiptNo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        const {
            date, receivedFrom, freight, transportation, packing, loading, unloading, unpacking,
            insurance, bikeCharges, carTransportation, gstin, total, additionalReceiptFor
        } = formData;
        if (!date || !receivedFrom || !freight || !transportation || !packing || !loading || !unloading ||
            !unpacking || !insurance || !bikeCharges || !carTransportation || !gstin || !total || !additionalReceiptFor) {
            toast.error('Please fill all the fields.');
            return;
        }

        setLoading(true);

        const clientEmail = sessionStorage.getItem('email');
        const dataToSend = {
            videlr,
            grossTotalWords,
            billtyDate,
            from,
            to,
            additionalReceiptNo,
            ...formData,
            clientEmail
        };

        try {
            const response = await axios.post('https://tms-server-nt4d.onrender.com/additionalreceipt',dataToSend);
            toast.success(response.data.message);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error('Failed to create additional cash receipt');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="additional-receipt-container">
            <div className="receipt-menu-head">
                <h1 className="receipt-menu-header">Additional Receipt</h1>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    Receipt Number <input type="number" value={additionalReceiptNo} disabled />
                </h3>
                <h3 className="receipt-menu-header">
                    Date <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </h3>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    Received with thanks from Mr./Mrs <input type="text" name="receivedFrom" value={formData.receivedFrom} onChange={handleChange} required />
                </h3>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    Rupees <input type="text" value={grossTotalWords} readOnly />
                </h3>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    Being The Freight Charges From <input type="text" value={from} readOnly />
                </h3>
                <h3 className="receipt-menu-header">
                    To <input type="text" value={to} readOnly />
                </h3>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    Vide L/R Number <input type="number" value={videlr} readOnly />
                </h3>
                <h3 className="receipt-menu-header">
                    Date <input type="date" value={billtyDate} readOnly /> as details below:
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Freight</td>
                            <td><input type="number" name="freight" value={formData.freight} onChange={handleChange} required /></td>
                            <td>Transportation</td>
                            <td><input type="number" name="transportation" value={formData.transportation} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Packing</td>
                            <td><input type="number" name="packing" value={formData.packing} onChange={handleChange} required /></td>
                            <td>Loading</td>
                            <td><input type="number" name="loading" value={formData.loading} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Unloading</td>
                            <td><input type="number" name="unloading" value={formData.unloading} onChange={handleChange} required /></td>
                            <td>Unpacking</td>
                            <td><input type="number" name="unpacking" value={formData.unpacking} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Insurance</td>
                            <td><input type="number" name="insurance" value={formData.insurance} onChange={handleChange} required /></td>
                            <td>Bike Charges</td>
                            <td><input type="number" name="bikeCharges" value={formData.bikeCharges} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td>Car Transportation</td>
                            <td><input type="number" name="carTransportation" value={formData.carTransportation} onChange={handleChange} required /></td>
                            <td>GSTIN</td>
                            <td><input type="number" name="gstin" value={formData.gstin} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td colSpan="2">Total</td>
                            <td colSpan="2"><input className="table-total" type="number" name="total" value={formData.total} onChange={handleChange} required /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="receipt-menu-row">
                <h3 className="receipt-menu-header">
                    For: <input type="text" name="additionalReceiptFor" value={formData.additionalReceiptFor} onChange={handleChange} required />
                </h3>
            </div>
            <button type="button" className="submit-button" onClick={handleSubmit} disabled={isSubmitted || loading}>
                {loading ? 'Saving...' : 'Save'}
            </button>
            {isSubmitted && (
                <div className="submission-message" style={{ color: 'red', marginTop: '20px' }}>
                    Additional receipt submitted successfully. You can print it now.
                </div>
            )}
        </div>
    );
};

export default AdditionalReceipt;
