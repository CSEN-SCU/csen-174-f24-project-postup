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


const ToolsAndUsefulLinks = () => {
  return (
    <div className="flex flex-col font-sans min-h-screen">
      <div className="grid grid-cols-4 gap-4 p-4 flex-grow">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Contact Advisors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 text-sm">
              <div className="flex flex-col">
                <CardDescription>Advisor Name</CardDescription>
                <CardDescription>{contactAdvisorInfo.name}</CardDescription>
              </div>
              <div className="flex flex-col">
                <CardDescription>Phone Number</CardDescription>
                <CardDescription>{contactAdvisorInfo.number}</CardDescription>
              </div>
              <div className="flex flex-col">
                <CardDescription>Email</CardDescription>
                <CardDescription>{contactAdvisorInfo.email}</CardDescription>
              </div>
              <div className="flex flex-col">
                <CardDescription>Office Location</CardDescription>
                <CardDescription>
                  {contactAdvisorInfo.officeLocation}
                </CardDescription>
              </div>
              <div className="flex flex-col">
                <CardDescription>Office Hours</CardDescription>
                <CardDescription>
                  {contactAdvisorInfo.officeHours}
                </CardDescription>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Community Advice</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Peer Advisor A says: ...</CardDescription>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Peer Advisors</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{peerAdvisorInfo.name}</CardDescription>
            <CardDescription>{peerAdvisorInfo.email}</CardDescription>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Useful Links for CSEN</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm">
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
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Office of the Registrar Links</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ToolsAndUsefulLinks;
