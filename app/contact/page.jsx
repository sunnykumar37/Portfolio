"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"


import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

import {motion} from "framer-motion"

const info = [
  {
    icon: <FaPhoneAlt/>,
    title:"Phone",
    description: "+91 9138136866"
  },
  {
    icon: <FaEnvelope/>,
    title:"Email",
    description: "sunnyk28912@gmail.com"
  },
  {
    icon: <FaMapMarkerAlt/>,
    title:"Address",
    description: "Gohana, Haryana, 131304"
  },
]

const Contact = () => {
  const [selectedService, setSelectedService] = useState("")
  const [status, setStatus] = useState({ type: "", message: "" })
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const payload = {
      firstName: (formData.get("firstName") || "").toString().trim(),
      lastName: (formData.get("lastName") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      phone: (formData.get("phone") || "").toString().trim(),
      service: selectedService,
      message: (formData.get("message") || "").toString().trim(),
    }

    if (!payload.firstName || !payload.email || !payload.message) {
      setStatus({
        type: "error",
        message: "Please fill first name, email, and message."
      })
      return
    }

    setIsSending(true)
    setStatus({ type: "", message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const responseBody = await response.json()

      if (!response.ok) {
        throw new Error(responseBody?.error || "Unable to send message right now.")
      }

      event.currentTarget.reset()
      setSelectedService("")
      setStatus({
        type: "success",
        message: "Message sent successfully. I will get back to you soon."
      })
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Unable to send message right now."
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <motion.section initial = {{opacity:0}}
    animate={{
      opacity:1,
      transition:{delay:2.4, duration: 0.4, ease:"easeInOut"},
    }}
      className="py-6"
    >
      
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">Let's Work together</h3>
              <p className="text-white/60">I'm always open to collaborating on innovative projects, internships, and opportunities to build impactful digital solutions.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="firstName" type="text" placeholder="Firstname" required/>
                <Input name="lastName" type="text" placeholder="Lastname"/>
                <Input name="email" type="email" placeholder="Email address" required/>
                <Input name="phone" type="tel" placeholder="Phone number"/>
              </div>

                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a service"/>
                  </SelectTrigger>
                 
                      <SelectContent>
                      <SelectGroup>
                    <SelectLabel className="bg-black text-white">Select a service</SelectLabel>
                    <SelectItem className="bg-black text-white" value="Web Development">Web Development</SelectItem>
                    <SelectItem className="bg-black text-white" value="Front-end">Front-end</SelectItem>
                    <SelectItem className="bg-black text-white" value="Back-end">Back-end</SelectItem>
                    <SelectItem className="bg-black text-white" value="FullStack App">FullStack App</SelectItem>
                  </SelectGroup>
                      </SelectContent>

                </Select>

                <Textarea
                name="message"
                placeholder="Type your message here..."
                className="h-[200px] bg-primary text-accent"
                required
                />

                <Button type="submit" disabled={isSending} size="md" className="max-w-40 px-10 py-2 bg-accent rounded-lg text-black">{isSending ? "Sending..." : "Send message"}</Button>

                {status.message ? (
                  <p className={`text-sm ${status.type === "success" ? "text-accent" : "text-red-400"}`}>{status.message}</p>
                ) : null}

            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-0">
            <ul className="flex flex-col gap-10">
              {
                info.map((item, index) => {
                  return <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                })
              }
            </ul>
          </div>
        </div>
      </div>

    </motion.section>
  )
}

export default Contact
