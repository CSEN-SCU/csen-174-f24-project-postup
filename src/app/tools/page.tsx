// pages/tools-and-useful-links.js

import React from 'react';

const ToolsAndUsefulLinks = () => {
  return (
    <div className="flex flex-col font-sans">
      
      {/* Main Content */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Contact Advisors Section */}
        <section className="col-span-3 bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Contact Advisors</h2>
          <div className="grid grid-cols-5 gap-2 text-sm">
            <div>Advisor Name</div>
            <div>Number</div>
            <div>Email</div>
            <div>Office Location</div>
            <div>Office Hours</div>
          </div>
        </section>
        
        {/* Community Advice Section */}
        <section className="col-span-1 bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Community Advice</h2>
          <p className="text-sm">Peer Advisor A says: ...</p>
        </section>
        
        {/* Peer Advisors Section */}
        <section className="col-span-1 bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Peer Advisors</h2>
          <p className="text-sm">Peer Advisor A</p>
          <p className="text-sm">Email</p>
        </section>
        
        {/* Useful Links Section */}
        <section className="col-span-1 bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Useful Links for [Major] and [Minor]</h2>
          <ul className="list-disc list-inside text-sm">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </section>
        
        {/* Office of the Registrar Links Section */}
        <section className="col-span-1 bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Office of the Registrar Links</h2>
          <ul className="list-disc list-inside text-sm">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ToolsAndUsefulLinks;
