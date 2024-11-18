// pages/tools-and-useful-links.js
import React from "react";

// Import Lucide React icons for aesthetics
import { ExternalLink, Mail, Phone, MapPin, Clock, Users, Book, School, FileText } from "lucide-react";

// Import Shadcn components
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  //CardDescription, // Unused; uncomment if needed
} from "@/components/ui/card";
import NavBar from "../../components/Navigation/NavBar";

const csenLinks = [
  {
    name: "B.S. in Computer Science and Engineering",
    link: "https://www.scu.edu/engineering/academic-programs/department-of-computer-engineering/undergraduate/computer-science-and-engineering-major/",
    icon: School,
  },
  {
    name: "Computer Science and Engineering Advice From a Former Student",
    link: "https://jrandleman.github.io/doc/CoenAdvice.pdf",
    icon: FileText,
  },
];

const officeOfRegistrarLinks = [
  {
    name: "Academic Calendar",
    link: "https://www.scu.edu/registrar/ugrd-academic-calendar/#d.en.6107",
    icon: FileText,
  },
  {
    name: "Academic Policies and Procedures",
    link: "https://www.scu.edu/registrar/academic-policies--procedures/undergraduate-programs/#d.en.6111",
    icon: Book,
  },
  {
    name: "Census",
    link: "https://www.scu.edu/registrar/quick-links/census-data-/#d.en.6119",
    icon: Users,
  },
  {
    name: "Commencement",
    link: "https://www.scu.edu/commencement/",
    icon: School,
  },
  {
    name: "Core Classes",
    link: "https://www.scu.edu/provost/core/",
    icon: Book,
  },
  {
    name: "Diplomas",
    link: "https://www.scu.edu/registrar/frequently-asked-questions/",
    icon: FileText,
  },
  {
    name: "Workday",
    link: "https://www.scu.edu/apps/login/",
    icon: ExternalLink,
  },
];

const contactAdvisorInfo = {
  name: "John Doe",
  number: "(123) 456-7890",
  email: "johndoe@example.com",
  officeLocation: "Room 101, Engineering Building",
  officeHours: "Mon-Fri, 9am-5pm",
};

const peerAdvisorInfo = [
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
  },
  {
    name: "J. Random",
    email: "jrandom@example.com",
  },
];

const ToolsAndUsefulLinks = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar isLoggedIn={true} selectedPage={"Tools"} />
      <div className="w-full max-w-screen-2xl mx-auto p-8">
        <div className="space-y-8">
          {/* Contact Advisors Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="text-3xl font-bold text-gray-800">
                Contact Advisors
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Name</p>
                    <p className="text-gray-600">{contactAdvisorInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Phone</p>
                    <p className="text-gray-600">{contactAdvisorInfo.number}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Email</p>
                    <p className="text-gray-600">{contactAdvisorInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Location</p>
                    <p className="text-gray-600">{contactAdvisorInfo.officeLocation}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-700">Office Hours</p>
                    <p className="text-gray-600">{contactAdvisorInfo.officeHours}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Community Advice Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-3xl font-bold text-gray-800">
                  Community Advice
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 italic">
                      &quot;Peer Advisor A says: ...&quot;
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700 italic">
                      &quot;Peer Advisor B says: ...&quot;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Peer Advisors Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-3xl font-bold text-gray-800">
                  Peer Advisors
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {peerAdvisorInfo.map((advisor, index) => (
                    <div
                      key={index}
                      className="p-4 bg-blue-50 rounded-lg flex items-start space-x-3"
                    >
                      <Users className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-700">{advisor.name}</p>
                        <p className="text-gray-600">{advisor.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CSEN Links Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-3xl font-bold text-gray-800">
                  Useful Links for CSEN
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {csenLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      <link.icon className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-600 hover:text-blue-800">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Office of the Registrar Links Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-3xl font-bold text-gray-800">
                  Office of the Registrar Links
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {officeOfRegistrarLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      <link.icon className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-600 hover:text-blue-800">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsAndUsefulLinks;