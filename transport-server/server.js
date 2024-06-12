//server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const deleteClientRoutes = require("./routes/deleteClients");
const adminloginRoutes = require("./routes/adminLogin");
const clientloginRoutes = require("./routes/clientlogin");
const partyDetailsRoutes = require("./routes/partyDetails");
const partiesRoutes = require('./routes/partiesRoutes');
const clientRoutes = require('./routes/clientRoutes');
const statesRoutes = require('./routes/statesRoutes')
const citiesRoutes = require('./routes/citiesRoutes');
const pincodeRoutes = require('./routes/pincodesRoutes')
const addClientRoutes=require('./routes/addClientRoutes')
const showClientProfileRoutes = require('./routes/showClientProfile')
const deletePartyRoutes=require('./routes/deletePartiesRoutes')
const companyDetailsRoutes = require('./routes/companydetails');
const grnoandDateRoutes = require('./routes/grnoanddate');
const getPartiesRoutes = require('./routes/getParties');
const getBilityListRoutes=require('./routes/bilityList')
const addBilltyRoutes=require('./routes/addBillty')
const deliveryOfficeRoutes=require('./routes/deiveryoffice')
const insuranceRoutes=require('./routes/insurance')
const agentRoutes=require('./routes/agent')
const demurrageChargesRoutes=require('./routes/demurragecharges')
const CashReceiptNoRoutes=require('./routes/cashreceiptnumber')
const CashReceiptDataRoutes=require('./routes/cashReceiptData')
const additionalReceiptNoRoute=require('./routes/additionalReceiptNo')
const additionalReceiptData=require('./routes/additionalReceiptData')
const addPackingListRoutes = require('./routes/addPackingList')
const listnoRoutes = require('./routes/getlistno');
const getBiltyPreviewRoutes = require('./routes/getbiltypreview')
const packingListFetchRoutes=require('./routes/packinglistfetchroute')
const getCashReceiptRoutes = require('./routes/getCashReceiptPreview');
const getAdditionalCashReceiptRoutes = require('./routes/getAdditionalCashReceiptPreview');
const fetchCashreceiptRoute=require('./routes/showCashReceipt')
const fetchAdditionalCashRoute=require('./routes/showAdditionalRoute')
const app = express();


app.use(cors());
app.use(bodyParser.json());


app.use("/", deleteClientRoutes);
app.use("/", adminloginRoutes);
app.use("/", clientloginRoutes);
app.use('/', partyDetailsRoutes);
app.use('/', clientRoutes);
app.use('/', statesRoutes);
app.use('/', citiesRoutes);
app.use('/', partiesRoutes);
app.use('/',pincodeRoutes);
app.use('/',addClientRoutes);
app.use('/',showClientProfileRoutes);
app.use('/',deletePartyRoutes);
app.use('/', companyDetailsRoutes);
app.use('/', grnoandDateRoutes);
app.use('/', getPartiesRoutes);
app.use('/', getBilityListRoutes);
app.use('/',addBilltyRoutes)
app.use('/',deliveryOfficeRoutes)
app.use('/',insuranceRoutes)
app.use('/',agentRoutes)
app.use('/',demurrageChargesRoutes)
app.use('/',CashReceiptNoRoutes)
app.use('/',CashReceiptDataRoutes)
app.use('/',additionalReceiptNoRoute)
app.use('/',additionalReceiptData)
app.use('/',addPackingListRoutes)
app.use('/',listnoRoutes)
app.use('/',getBiltyPreviewRoutes)
app.use('/',packingListFetchRoutes)
app.use('/',getCashReceiptRoutes)
app.use('/',getAdditionalCashReceiptRoutes)
app.use('/',fetchCashreceiptRoute)
app.use('/',fetchAdditionalCashRoute)
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});