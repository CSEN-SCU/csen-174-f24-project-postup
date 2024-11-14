// original tools and useful links page

// pages/tools-and-useful-links.js
import React from "react";
// Import Shadcn components

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import NavBar from "../../components/Navigation/NavBar";

const csenLinks = [
  {
    name: "B.S. in Computer Science and Engineering",
    link: "https://www.scu.edu/engineering/academic-programs/department-of-computer-engineering/undergraduate/computer-science-and-engineering-major/",
  },
  {
    name: "Computer Science and Engineering Advice From a Former Student",
    link: "https://jrandleman.github.io/doc/CoenAdvice.pdf"
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

const contactAdvisorInfo = {
  name: "John Doe",
  number: "(123) 456-7890",
  email: "johndoe@example.com",
  officeLocation: "Room 101, Engineering Building",
  officeHours: "Mon-Fri, 9am-5pm",
};

const peerAdvisorInfo = {
  name: "Jane Smith",
  email: "janesmith@example.com",

  name2: "J. Random",
  email2: "jrandom@example.com",
};

const ToolsAndUsefulLinks = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar isLoggedIn={true} selectedPage={"Tools"} />
      <div className="w-full max-w-screen-2xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Advisors spans full width */}
          <Card className="col-span-2 shadow-lg p-6 w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-gray-800">
                Contact Advisors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-lg">
                <div className="flex flex-col">
                  <CardDescription className="text-xl font-semibold text-gray-800">
                    Name
                  </CardDescription>
                  <CardDescription className="text-xl text-gray-900">
                    {contactAdvisorInfo.name}
                  </CardDescription>
                </div>
                <div className="flex flex-col">
                  <CardDescription className="text-xl font-semibold text-gray-800">
                    Phone Number
                  </CardDescription>
                  <CardDescription className="text-xl text-gray-900">
                    {contactAdvisorInfo.number}
                  </CardDescription>
                </div>
                <div className="flex flex-col">
                  <CardDescription className="text-xl font-semibold text-gray-800">
                    Email
                  </CardDescription>
                  <CardDescription className="text-xl text-gray-900">
                    {contactAdvisorInfo.email}
                  </CardDescription>
                </div>
                <div className="flex flex-col">
                  <CardDescription className="text-xl font-semibold text-gray-800">
                    Office Location
                  </CardDescription>
                  <CardDescription className="text-xl text-gray-900">
                    {contactAdvisorInfo.officeLocation}
                  </CardDescription>
                </div>
                <div className="flex flex-col">
                  <CardDescription className="text-xl font-semibold text-gray-800">
                    Office Hours
                  </CardDescription>
                  <CardDescription className="text-xl text-gray-900">
                    {contactAdvisorInfo.officeHours}
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Advice and Peer Advisors side by side */}
          <Card className="col-span-1 shadow-lg p-6 w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-gray-800">
                Community Advice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-xl">
                Peer Advisor A says: ... <br /><br /><br /><br />
                Peer Advisor B says: ...
              </CardDescription>
            </CardContent>
          </Card>

          {/* Peer Advisors with inner card for advisor details */}
          <Card className="col-span-1 shadow-lg p-6 w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-gray-800">
                Peer Advisors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Card className="shadow p-1 bg-gray-200 w-full mb-5">
                <CardContent>
                  <CardDescription className="text-2xl font-semibold text-gray-800 mt-5">
                    Name: {peerAdvisorInfo.name}
                  </CardDescription>
                  <CardDescription className="text-xl text-gray-700">
                    Email: {peerAdvisorInfo.email}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="shadow p-1 bg-gray-200 w-full">
                <CardContent>
                  <CardDescription className="text-2xl font-semibold text-gray-800 mt-5">
                    Name: {peerAdvisorInfo.name2}
                  </CardDescription>
                  <CardDescription className="text-xl text-gray-700">
                    Email: {peerAdvisorInfo.email2}
                  </CardDescription>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Useful Links for CSEN and Office of the Registrar Links side by side */}
          <Card className="col-span-1 shadow-lg p-6 w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-gray-800">
                Useful Links for CSEN
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-lg space-y-3 text-blue-600">
                {csenLinks.map((link, index) => (
                  <li key={index} className="hover:text-blue-500">
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="col-span-1 shadow-lg p-6 w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-gray-800">
                Office of the Registrar Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-lg space-y-3 text-blue-600">
                {officeOfRegistrarLinks.map((link, index) => (
                  <li key={index} className="hover:text-blue-500">
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ToolsAndUsefulLinks;
