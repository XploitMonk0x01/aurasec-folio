'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AboutSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="about"
      className="py-12"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">About Me</CardTitle>
          <CardDescription>A brief overview of my background and interests.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            I am a cybersecurity student at Milton University, currently in my 2nd year.
            I am passionate about network security, ethical hacking, and protecting digital assets.
          </p>
          <br />
          <p>
            My technical skills include:
            <ul>
              <li>- Penetration Testing</li>
              <li>- Network Analysis</li>
              <li>- Cryptography</li>
              <li>- Security Auditing</li>
            </ul>
          </p>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default AboutSection;
