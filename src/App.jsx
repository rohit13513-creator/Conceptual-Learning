import React from "react"; import { motion } from "framer-motion"; import { Button } from "@/components/ui/button"; import { Card, CardContent } from "@/components/ui/card"; import { Phone, MessageCircle, Star, Users, BookOpen } from "lucide-react";

export default function ConceptualLearningHome() { return ( <div className="bg-white text-gray-900">

{/* HERO SECTION */}
  <section className="bg-gradient-to-br from-red-50 to-white py-16 px-6 text-center">
    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
      Conceptual Learning
    </motion.h1>

    <p className="mt-4 text-lg text-gray-600">
      Preparing Future Minds with Strong Concepts in Maths & Science
    </p>

    <div className="mt-6 flex flex-wrap justify-center gap-4">
      <Button className="bg-red-500 text-white px-6 py-3 rounded-2xl">
        Book Free Demo Class
      </Button>
      <Button variant="outline" className="px-6 py-3 rounded-2xl">
        Contact Us
      </Button>
    </div>

    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div>
        <h2 className="text-2xl font-bold">500+</h2>
        <p className="text-sm text-gray-500">Students Taught</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold">6+ Years</h2>
        <p className="text-sm text-gray-500">Experience</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold">90%+</h2>
        <p className="text-sm text-gray-500">Results Improved</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Small Batches</h2>
        <p className="text-sm text-gray-500">Better Focus</p>
      </div>
    </div>
  </section>

  {/* WHY CHOOSE US */}
  <section className="py-16 px-6 max-w-6xl mx-auto">
    <h2 className="text-3xl font-semibold text-center">Why Choose Us?</h2>
    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {[
        "Concept-Based Teaching",
        "Weekly Tests & Reports",
        "Personal Attention",
        "Doubt Solving Sessions",
        "Parent Feedback System",
        "Exam Strategy Guidance",
      ].map((item, i) => (
        <Card key={i} className="rounded-2xl shadow-md">
          <CardContent className="p-6 text-center">
            <p className="font-medium">{item}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>

  {/* COURSES */}
  <section className="bg-gray-50 py-16 px-6">
    <h2 className="text-3xl text-center font-semibold">Our Courses</h2>

    <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">

      {[{
        title: "Class 8",
        desc: "Strong foundation building with basics"
      }, {
        title: "Class 9",
        desc: "Concept clarity with application practice"
      }, {
        title: "Class 10",
        desc: "Board exam preparation with strategy"
      }].map((course, i) => (
        <Card key={i} className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="mt-2 text-gray-600">{course.desc}</p>
            <Button className="mt-4 w-full bg-red-500">Enroll Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>

  {/* TESTIMONIALS */}
  <section className="py-16 px-6 max-w-6xl mx-auto">
    <h2 className="text-3xl text-center font-semibold">What Parents Say</h2>

    <div className="grid md:grid-cols-3 gap-6 mt-10">
      {["My child improved a lot!", "Best coaching in area", "Very supportive teacher"].map((text, i) => (
        <Card key={i} className="rounded-2xl">
          <CardContent className="p-6">
            <p>"{text}"</p>
            <div className="flex mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>

  {/* FINAL CTA */}
  <section className="bg-red-500 text-white py-16 text-center">
    <h2 className="text-3xl font-bold">Limited Seats Available</h2>
    <p className="mt-2">New Batch Starting Soon</p>
    <Button className="mt-6 bg-white text-red-500 px-6 py-3 rounded-2xl">
      Book Your Demo Now
    </Button>
  </section>

  {/* FOOTER */}
  <footer className="py-10 text-center text-sm text-gray-500">
    <p>Conceptual Learning | Rohit Sharma</p>
    <p>WhatsApp: 9810886024</p>
  </footer>

  {/* FLOATING BUTTONS */}
  <div className="fixed bottom-6 right-6 flex flex-col gap-3">
    <a href="tel:9810886024">
      <Button className="rounded-full bg-green-500 p-4">
        <Phone />
      </Button>
    </a>
    <a href="https://wa.me/919810886024">
      <Button className="rounded-full bg-green-600 p-4">
        <MessageCircle />
      </Button>
    </a>
  </div>

</div>

); }
