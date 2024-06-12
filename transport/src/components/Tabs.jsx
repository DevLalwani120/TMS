import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DeliveryForm from './deliveryOffice';
import Insurance from './Insurance';
import Agent from './Agent';
import DemurrageCharges from './demurrageCharges';
import Caution from './Caution';
import Notice from './Notice';



const Tabsbar =({docketno})=>{
    return(
        <>
        <Tabs>
    <TabList>
      <Tab>Delivery Office</Tab>
      <Tab>Insurance</Tab>
      <Tab>Agent</Tab>
      <Tab>Demmurage Charges</Tab>
      <Tab>Caution</Tab>
      <Tab>Notice</Tab>
    </TabList>

    <TabPanel>
<DeliveryForm docketno={docketno}/>
    </TabPanel>
    <TabPanel>
    <Insurance docketno={docketno}/>
    </TabPanel>
    <TabPanel>
    <Agent docketno={docketno}/>
    </TabPanel>
    <TabPanel>
   <DemurrageCharges docketno={docketno}/>
    </TabPanel>
    <TabPanel>
   <Caution docketno={docketno}/>
    </TabPanel>
    <TabPanel>
   <Notice docketno={docketno}/>
    </TabPanel>
  </Tabs>
        </>
    )
}
export default Tabsbar