import { motion } from 'motion/react'
import React from 'react'

const Contact = () => {
  return (
    <div className="w-11/12 my-10  mx-auto">
          <div className=" flex flex-col md:flex-row gap-10 items-start md:items-center  justify-between  font-bold ">
            <motion.div
              drag
              initial={{ x: -40, opacity: 0.5 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className=" text-3xl  sm:text-5xl  lg:text-6xl "
            >
              Small Pricing Plan For <br /> Your Courses
            </motion.div>
    
            <div className="flex flex-col gap-2 items-start justify-center font-bold ">
              <div className="text-2xl sm:text-3xl  w-55  ">Get in Touch</div>
              <motion.div
                initial={{ y: 40, opacity: 0.5 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-sm flex flex-col gap-5 "
              >
                <div className="flex   items-center justify-between">
                  <p>Register Your Complaint:</p>
                  <button className="transition duration-300 text-green-800 rounded  border-2 border-green-800 px-4 md:px-[29px] py-1 mx-4 hover:bg-green-800 hover:text-white hover:shadow-2xl shadow-green-900 ">
                    Register Complain
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p>Track Your Complaint:</p>
                  <button className="transition duration-300 text-green-800 rounded  border-2 border-green-800 px-[22px] md:px-[36px] py-1 mx-4 hover:bg-green-800 hover:text-white hover:shadow-2xl shadow-green-900">
                    Track Complaint
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="my-10 grid grid-cols-1 md:grid-cols-2   ">
            <div className="w-90  my-10">
              <h1 className="text-blue-700 text-xl font-semibold">
                Terms & Conditions
              </h1>
              <p className='w-80'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
                ducimus nostrum? Saepe, eligendi provid ent sunt quos consectetur
                harum praes entium quoe st esse pariatur repellendus, fugit amet,
                placeatveni am nisi eaque alias perspiciatis facilis dolore necessi
                tatibus cum sint nulla! Soluta dolore beatae, molest iae architecto
                doloribus quaerat quo facere odiorepr ehenderit temporibus accusamus
                voluptate dolorum fugiat alias! Voluptatum esse animi facere
                recusanda eadipisci, non distinctio alias dolorem at debitisratio ne
                minus amet ex, dolore quaerat nam laudantium!
              </p>
              <button className=" py-2 px-4 border-2 border-black text-white bg-black my-3 font-semibold hover:text-black hover:bg-white transition-all">
                Read More..
              </button>
            </div>
            {/* Form Container */}
            <div className=" w-120  p-5 rounded-md shadow-2xl my-10  border h-[480px]">
              <h1 className="text-2xl font-bold">Let's Connect</h1>
              <form action="" className="">
                <div className=" flex item-start flex-col my-2">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter User Name"
                    className="  rounded p-1 border-0 bg-gray-200 hover:scale-[1.02] transition-all duration-150"
                    id="name"
                  />
                </div>
                <div className="flex item-start flex-col my-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter User Email"
                    className="hover:scale-[1.02] rounded transition-all duration-150  p-1 border-0 bg-gray-200"
                    id="email"
                  />
                </div>
                <div className="flex item-start flex-col my-2">
                  <label htmlFor="number">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter User Number"
                    className="hover:scale-[1.02] rounded transition-all duration-150  p-1 border-0 bg-gray-200"
                    id="number"
                  />
                </div>
                <div className="flex item-start flex-col my-2">
                  <label htmlFor="msg">Message</label>
                  <textarea
                    placeholder="Enter Your message"
                    className="hover:scale-[1.02] rounded transition-all duration-150 h-20  p-1 border-0 bg-gray-200"
                    id="msg"
                  />
                </div>
                <div>
                  <input type="checkbox" />
                  <span> I accept the Terms of Service</span>
                </div>
                <div>
                  <button className="bg-blue-500 px-4 w-86 rounded-md py-2 m-2 font-medium hover:text-white transition-all duration-400 ">
                    Submit Your Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  )
}

export default Contact