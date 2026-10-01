import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Building } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email and we'll respond within 24 hours",
    value: "contact@voyageedu.edu.in",
    action: "Send Email"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team during business hours",
    value: "+91 98765 43210",
    action: "Call Now"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come visit our office in the heart of Delhi",
    value: "VISHWAKARMA INSTITUTE OF TECHNOLOGY VIT, Upper Indira Nagar, Bibwewadi, Pune, Maharashtra 411037",
    action: "Get Directions"
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "We're here to help during these hours",
    value: "Mon-Fri: 9:00 AM - 6:00 PM IST",
    action: "View Calendar"
  }
];

const faqItems = [
  {
    question: "How do I search for institutions?",
    answer: "Use our interactive map or search feature to find institutions by location, type, or specialization."
  },
  {
    question: "Is the information verified?",
    answer: "Yes, we verify all institution information through official sources and regular updates."
  },
  {
    question: "Can I suggest a new institution?",
    answer: "Absolutely! Use our contact form to suggest institutions that should be added to our platform."
  },
  {
    question: "How often is the data updated?",
    answer: "We update our database quarterly and monitor for changes in real-time."
  }
];

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="py-16 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Have questions about VoyageEdu? Need help finding the right institution? We're here to help you on your educational journey.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-primary/10">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <method.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium mb-4">{method.value}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      Get in Touch
                    </CardTitle>
                    <CardDescription>
                      Whether you have questions, suggestions, or need support, we'd love to hear from you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="suggestion">Institution Suggestion</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us how we can help you..."
                        className="min-h-[120px]"
                      />
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>

                {/* FAQ Section */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-accent" />
                        Frequently Asked Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {faqItems.map((faq, index) => (
                        <div key={index} className="border-b border-border/40 pb-4 last:border-b-0 last:pb-0">
                          <h4 className="font-medium mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-primary" />
                        For Institutions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Are you representing an educational institution? Get in touch to learn about featuring your institution on VoyageEdu.
                      </p>
                      <Button variant="outline" className="w-full">
                        Institution Partnership
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Location */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Visit Our Office</h2>
              <p className="text-muted-foreground">
                Located at VIT Pune campus, we welcome visitors by appointment.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8">
                      <h3 className="text-xl font-semibold mb-4">VoyageEdu Headquarters</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Address</p>
                           <p className="text-muted-foreground text-sm">
                              VISHWAKARMA INSTITUTE OF TECHNOLOGY VIT<br />
                              Upper Indira Nagar, Bibwewadi<br />
                              Pune, Maharashtra 411037
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Office Hours</p>
                            <p className="text-muted-foreground text-sm">
                              Monday - Friday: 9:00 AM - 6:00 PM<br />
                              Saturday: 10:00 AM - 2:00 PM<br />
                              Sunday: Closed
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button className="mt-6 w-full">
                        Schedule a Visit
                      </Button>
                    </div>
                    <div className="bg-muted/50 p-8 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Interactive map coming soon</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;