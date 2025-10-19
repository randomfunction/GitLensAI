'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    setStatus('Submitting...');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('Message sent!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('An error occurred.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred.');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button onClick={handleSubmit} disabled={status === 'Submitting...'}>
            {status === 'Submitting...' ? 'Submitting...' : 'Submit'}
          </Button>
          {status && <p className="text-center mt-4">{status}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
