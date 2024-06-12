import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/packinglist.css';

const PackingList = ({ docketno, from, to, consigneeName, consignorName, date }) => {
    const [listNo, setListNo] = useState('');
    const [rows, setRows] = useState([{ id: 1, markaNo: '', particulars: '', value: '' }]);

    const addRow = () => {
        const newRow = { id: rows.length + 1, markaNo: '', particulars: '', value: '' };
        setRows([...rows, newRow]);
    };

    const removeRow = (id) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const handleInputChange = (id, field, value) => {
        const updatedRows = rows.map(row => row.id === id ? { ...row, [field]: value } : row);
        setRows(updatedRows);
    };

    useEffect(() => {
        const fetchListNO = async () => {
            try {
                const email = sessionStorage.getItem('email');
                if (!email) {
                    throw new Error('Email is not available in session storage');
                }

                const response = await axios.get('https://tms-server-nt4d.onrender.com/getlistno', {
                    headers: {
                        'email': email
                    }
                });
                const { packinglistno } = response.data;
                setListNo(packinglistno);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchListNO();
    }, []);
    const validateRows = () => {
        for (let row of rows) {
            if (!row.markaNo || !row.particulars || !row.value) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async () => {
        const email = sessionStorage.getItem('email');
        if (!validateRows()) {
            toast.error('Please fill out all fields in the table.');
            return;
        }
        try {
            const payload = {
                listNo,
                docketno,
                date,
                from,
                to,
                consigneeName,
                consignorName,
                rows,
                email
            };
            console.log(payload);

            const response=await axios.post('https://tms-server-nt4d.onrender.com/savepackinglist', payload);
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Failed to save packing list: ' + error.message);
        }
    };

    return (
        <>
            <div className="packinglist-head">
                <h2 className='packinglist-header'>Packing List </h2>
            </div>
            <div className="receipt-menu-row">
                <h3 className='packinglist-header'>List No. <input type="number" value={listNo} readOnly/></h3>
                <h3 className='packinglist-header'>Docket No. <input type="number" value={docketno} readOnly /></h3>
                <h3 className='packinglist-header'> Date <input type="date" value={date} readOnly /></h3>
            </div>
            <div className="receipt-menu-row">
                <h3 className='packinglist-header'>From <input type="text" value={from} readOnly /></h3>
                <h3 className='packinglist-header'>To <input type="text" value={to} readOnly /></h3>
            </div>
            <div className="receipt-menu-row">
                <h3 className='packinglist-header'>Mr./Mrs. <input type="text" value={consignorName} readOnly /></h3>
                <h3 className='packinglist-header'>Mr./Mrs. <input type="text" value={consigneeName} readOnly /></h3>
            </div>

            <div className="receipt-menu-table">
                <table>
                    <thead>
                        <tr>
                            <th className='packing-table-header'>Marka No.</th>
                            <th className='packing-table-header'>Particulars</th>
                            <th className='packing-table-header'>Value</th>
                            <th className='packing-table-header'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => ( 
                            <tr key={row.id}>
                                <td className='packing-table-td'><input className='markano' type='number' value={row.markaNo} onChange={(e) => handleInputChange(row.id, 'markaNo', e.target.value)} /></td>
                                <td className='packing-table-td'><input className='packingparticular' type='text' value={row.particulars} onChange={(e) => handleInputChange(row.id, 'particulars', e.target.value)} /></td>
                                <td className='packing-table-td'><input className='packingvalue' type='text' value={row.value} onChange={(e) => handleInputChange(row.id, 'value', e.target.value)} /></td>
                                <td className='packing-table-td'>
                                    <button type='button' onClick={() => removeRow(row.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                    {index === rows.length - 1 && (
                                        <button type='button' onClick={addRow}><FontAwesomeIcon icon={faPlus} /></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button type='button' className="submit-button" onClick={handleSubmit}>Save Packing List</button>
        </>
    );
};

export default PackingList;
