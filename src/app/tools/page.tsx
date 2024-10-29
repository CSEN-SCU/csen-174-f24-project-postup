// pages/tools-and-useful-links.js
import NavBar from "@/components/navigation/NavBar";
import React from "react";

const csenLinks = [
  {
    name: "B.S. in Computer Science and Engineering",
    link: "https://www.scu.edu/engineering/academic-programs/department-of-computer-engineering/undergraduate/computer-science-and-engineering-major/",
  },
];

const officeOfRegistrarLinks = [
  {
    name: "Academic Calendar",
    link: "https://www.scu.edu/registrar/ugrd-academic-calendar/#d.en.6107",
  },
  {
    name: "Academic Policies and Procedures",
    link: "https://www.scu.edu/registrar/academic-policies--procedures/undergraduate-programs/#d.en.6111",
  },
  {
    name: "Census",
    link: "https://www.scu.edu/registrar/quick-links/census-data-/#d.en.6119",
  },
  {
    name: "Commencement",
    link: "https://www.scu.edu/commencement/",
  },
  {
    name: "Core Classes",
    link: "https://www.scu.edu/provost/core/",
  },
  {
    name: "Diplomas",
    link: "https://www.scu.edu/registrar/frequently-asked-questions/",
  },
  {
    name: "Workday",
    link: "https://www.scu.edu/apps/login/",
  },
];

const advisorInfo = {
  name: "name",
  number: "number",
  email: "email",
  officeLocation: "office location",
  officeHours: "office hours",
};

const ToolsAndUsefulLinks = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-end">
        <NavBar isLoggedIn={true} selectedPage={"Tools"}></NavBar>
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-3 gap-4 p-4 font-sans">
        {/* Contact Advisors Section */}
        <section className="col-span-3 bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Contact Advisors</h2>
          <div className="grid grid-cols-5 gap-2 text-sm">
            <div className="flex flex-col">
              <div>Advisor Name</div>
              <div>{advisorInfo.name}</div>
            </div>
            <div className="flex flex-col">
              <div>Number</div>
              <div>{advisorInfo.number}</div>
            </div>
            <div className="flex flex-col">
              <div>Email</div>
              <div>{advisorInfo.email}</div>
            </div>
            <div className="flex flex-col">
              <div>Office Location</div>
              <div>{advisorInfo.officeLocation}</div>
            </div>
            <div className="flex flex-col">
              <div>Office Hours</div>
              <div>{advisorInfo.officeHours}</div>
            </div>
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
          <p className="text-sm">{advisorInfo.name}</p>
          <p className="text-sm">{advisorInfo.email}</p>
        </section>

        {/* Useful Links Section */}
        <section className="col-span-1 bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Useful Links for CSEN</h2>
          {csenLinks.map((link, index) => (
              <li key={index} className="hover:text-blue-500">
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {link.name}
                </a>
              </li>
            ))}
        </section>

        {/* Office of the Registrar Links Section */}
        <section className="col-span-1 bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">
            Office of the Registrar Links
          </h2>
          <ul className="list-disc list-inside text-sm">
            {officeOfRegistrarLinks.map((link, index) => (
              <li key={index} className="hover:text-blue-500">
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ToolsAndUsefulLinks;
