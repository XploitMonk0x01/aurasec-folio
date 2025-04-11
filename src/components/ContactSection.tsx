'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ContactSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="contact"
      className="py-12"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Contact Me</CardTitle>
          <CardDescription>How to get in touch with me.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Feel free to reach out to me through the following channels:
          </p>
          <ul>
            <li>
              - <b>Email:</b> <a href="mailto:thomas.shelby@example.com">thomas.shelby@example.com</a>
            </li>
            <li>
              - <b>LinkedIn:</b> <a href="https://www.linkedin.com/in/thomas-shelby" target="_blank" rel="noopener noreferrer">linkedin.com/in/thomas-shelby</a>
            </li>
            <li>
              - <b>GitHub:</b> <a href="https://github.com/thomas-shelby" target="_blank" rel="noopener noreferrer">github.com/thomas-shelby</a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default ContactSection;
