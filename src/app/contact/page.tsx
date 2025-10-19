'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <div className="max-w-md mx-auto">
        <div className="space-y-4">
          <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={handleSubmit} disabled={status === 'Submitting...'}>
            {status === 'Submitting...' ? 'Submitting...' : 'Submit'}
          </Button>
          {status && <p className="text-center mt-4">{status}</p>}
        </div>
      </div>
    </div>
  );
}
