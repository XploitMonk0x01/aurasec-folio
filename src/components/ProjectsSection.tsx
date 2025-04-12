'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectsSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="projects"
      className="py-6 md:py-12" // Adjusted py for mobile
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Projects</CardTitle>
          <CardDescription>A selection of projects I've worked on.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6"> {/* Adjusted padding for mobile */}
          <p>
            Here are some of the projects I've been involved in:
          </p>
          <ul>
            <li>
              - <b>Network Intrusion Detection System:</b> Developed a system to detect malicious activities
              in a network using Snort.
            </li>
            <li>
              - <b>Vulnerability Assessment of Web Applications:</b> Performed assessments on web applications
              using tools like OWASP ZAP.
            </li>
            <li>
              - <b>Cryptography Implementation:</b> Implemented encryption algorithms using Python.
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default ProjectsSection;
