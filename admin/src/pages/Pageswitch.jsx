import React, { useState,useEffect } from 'react'
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { BarChart, Bar, XAxis, YAxis,  PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar, 
  IconButton,
  Tooltip
} from "@material-tailwind/react";
const TABLE_HEAD = ["Participants", "Gender & Age", "Status", "Country", "",""];
const Pageswitch = ({data,selectedFilter}) => {
const totalItems = data.length

const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const itemsPerPage = 10;


    const summaryData = [
      { name: "Total", value: 100 }, 
      { name: "Accepted", value: 60 },
      { name: "Rejected", value: 40 },
    ];
    
    const COLORS = ["#0088FE", "#00C49F", "#FF8042"];
    
    const dailyRegistrations = [
      { day: "Mon", users: 10 },
      { day: "Tue", users: 20 },
      { day: "Wed", users: 30 },
      { day: "Thu", users: 25 },
      { day: "Fri", users: 40 },
      { day: "Sat", users: 35 },
      { day: "Sun", users: 50 },
    ];



  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems]);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

if (selectedFilter=="dashboard"){

    

      return (
        <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 max-h-screen">
          {/* Summary Cards */}
          {summaryData.map((item, index) => (
            <Card key={index} className="p-6 text-center rounded-2xl shadow-lg bg-gray-200 border border-gray-300">
              <h2 className="text-lg font-bold text-gray-700">{item.name} Applications</h2>
              <p className="text-4xl font-semibold text-gray-900 mt-2">{data.length}</p>
            </Card>
          ))}
          
          {/* Charts */}
          <div className="col-span-2 bg-gray-200 p-6 shadow-lg rounded-2xl border border-gray-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Daily User Registrations</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyRegistrations}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#4F46E5" radius={[5, 5, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
    
          <div className="bg-gray-200 p-6 shadow-lg rounded-2xl border border-gray-300 flex justify-center items-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={summaryData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                  {summaryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      );  

}else{
    
  return (
    <div>


<Card className="h-full max-w-screen">
          <div className="overflow-x-auto">
            <CardBody className="px-4">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-4 py-3 text-left">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map(({ img, name, email, job, org, online, date ,_id}, index) => (
                    <tr key={name} className="hover:bg-gray-100 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar src={img} alt={name} size="sm" />
                          <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">{name}</Typography>
                            <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{email}</Typography>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Typography variant="small" color="blue-gray" className="font-normal">{job}</Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{org}</Typography>
                      </td>
                      <td className="px-4 py-3">

                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online}
                          color={
                            online === "accepted" || online === "Approved"
                              ? "green"
                              : online === "pending"
                                ? "yellow"
                                : "red"
                          }
                        />

                      </td>
                      <td className="px-4 py-3">
                        <Typography variant="small" color="blue-gray" className="font-normal">{date}</Typography>
                      </td>
                      <td className="px-4 py-3">
                       
                        <Link to={`/validate?_id=${_id._id}`}>
                        <Tooltip content="Validate User">
                          <IconButton variant="text">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          </IconButton>
                        </Tooltip>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </div>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <Typography variant="small" color="blue-gray" className="font-normal">
        Page {page} of {totalPages}
      </Typography>
      <div className="flex gap-2">
        <Button variant="outlined" size="sm" onClick={handlePrevious} disabled={page === 1}>
          Previous
        </Button>
        <Button variant="outlined" size="sm" onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </CardFooter>
        </Card>
    </div>
  )
}

}

export default Pageswitch
