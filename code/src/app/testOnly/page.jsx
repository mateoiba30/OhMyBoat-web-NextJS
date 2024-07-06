// components/GeneratePDF.js
"use client";

import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const GeneratePDF = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Reporte de Intercambios", 20, 10);
    autoTable(doc, { html: '#trade-table' });

    doc.save('reporte_intercambios.pdf');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={generatePDF}
      >
        Generar PDF
      </button>
      <table id="trade-table" className="hidden">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Intercambio 1</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Intercambio 2</td>
            <td>200</td>
          </tr>
          <tr>
            <td>Intercambio 3</td>
            <td>300</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GeneratePDF;
