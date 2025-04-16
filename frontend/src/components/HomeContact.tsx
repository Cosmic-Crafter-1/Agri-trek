import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HomeContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a delay
    setTimeout(() => {
      // Clear form data
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      
      // Show success message
      setShowSuccess(true);
      
      // Show toast notification
      toast.success('Message sent successfully! We will contact you within 24 hours.');
      
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-xl mx-auto mb-16 text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary border border-secondary/80 text-sm font-medium text-secondary-foreground">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Transform Your Agricultural Management?
          </h2>
          <p className="text-muted-foreground text-lg">
            Reach out to our team to learn more about how Agri-Trek can benefit your operations.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glassmorphism backdrop-blur-sm rounded-xl overflow-hidden card-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 bg-primary text-primary-foreground flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-left">Contact Information</h3>
                  <p className="mb-8 text-left">Fill out the form and our team will get back to you within 24 hours.</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-foreground/10 flex items-center justify-center mr-4">
                        <Phone className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="text-primary-foreground/70">Phone</p>
                        <p className="text-primary-foreground">+91 80-2356-7890</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-foreground/10 flex items-center justify-center mr-4">
                        <Mail className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="text-primary-foreground/70">Email</p>
                        <p className="text-primary-foreground">support@agritrek.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-foreground/10 flex items-center justify-center mr-4">
                        <MapPin className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="text-primary-foreground/70">Address</p>
                        <p className="text-primary-foreground">123 Agriculture Street, Indiranagar, Bengaluru - 560038</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 mt-8">
                    <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12 bg-white flex flex-col">
                {!showSuccess ? (
                  <form onSubmit={handleSubmit} className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="w-full">
                        <Label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2 text-left">First Name</Label>
                        <Input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="Rajesh"
                          className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-left"
                        />
                      </div>
                      <div className="w-full">
                        <Label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2 text-left">Last Name</Label>
                        <Input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Kumar"
                          className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-left"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6 w-full">
                      <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 text-left">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-left"
                      />
                    </div>
                    
                    <div className="mb-6 w-full">
                      <Label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2 text-left">Subject</Label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Message subject"
                        className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-left"
                      />
                    </div>
                    
                    <div className="mb-6 w-full">
                      <Label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 text-left">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Your message"
                        className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[150px] resize-none text-left"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-medium rounded-lg transition-all duration-300 hover:shadow-md"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-col h-full py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-left">Thank You!</h3>
                    <p className="text-muted-foreground mb-6 text-left">
                      Your message has been received. We'll contact you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setShowSuccess(false)}
                      className="px-4 py-2 bg-secondary/50 rounded-md hover:bg-secondary transition-colors"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact; 