import React from 'react';
import Navbar from '../components/Navbar';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contactus = ({setToken}) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-white-950">
      <Navbar setToken={setToken}/>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h1>
        
        <div className="flex justify-center">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-8 text-center">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-lg">Phone</p>
                  <p className="text-gray-600">+1 (123) 456-7890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-lg">Email</p>
                  <p className="text-gray-600">contact@example.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-lg">Address</p>
                  <p className="text-gray-600">123 Business Street</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-lg">Business Hours</p>
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sat - Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;