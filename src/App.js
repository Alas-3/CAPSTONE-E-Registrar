import React, {useState, useEffect} from 'react';
import Home from './components/Home';
import DocumentsRequest from './components/DocumentsRequest';
import Enrollment from './components/Enrollment';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import DisplayData from './components/DIsplayData';
import DisplayDataDR from './components/DisplayDataDR';
import ExamPermit from './components/ExamPermit';
import DisplayDataEP from './components/DisplayDataEP';
 
function App() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>
               
               <Route path="/" element={<Home/>}/>
               <Route path="/enrollment" element={<Enrollment />} />
               <Route path="/display-data" element={<DisplayData />} />
               <Route path="/documents-request" element={<DocumentsRequest />} />
               <Route path="/display-data-dr" element={<DisplayDataDR />} />
               <Route path="/exam-permit" element={<ExamPermit />} />
               <Route path='/display-data-ep'element={<DisplayDataEP/>} />
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;