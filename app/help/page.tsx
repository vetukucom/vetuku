import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600">Chat with our support team</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600">+91 98765 43210</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-gray-600">support@vetuku.com</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-6 h-6 mr-2" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I post an ad?</AccordionTrigger>
                <AccordionContent>
                  To post an ad, click the "Post Ad" button in the header, create an account if you haven't already,
                  then fill out the ad form with your item details, photos, and contact information.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Is it free to post ads?</AccordionTrigger>
                <AccordionContent>
                  Yes, posting basic ads is completely free. We also offer premium features like featured listings and
                  promoted ads for a small fee to increase visibility.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do I contact a seller?</AccordionTrigger>
                <AccordionContent>
                  On each ad page, you'll find the seller's contact information including phone number and email. You
                  can also use our built-in messaging system to communicate safely.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do I edit or delete my ad?</AccordionTrigger>
                <AccordionContent>
                  Log into your account and go to "My Ads" in your dashboard. From there, you can edit, renew, or delete
                  any of your active listings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What should I do if I encounter a suspicious ad?</AccordionTrigger>
                <AccordionContent>
                  If you encounter a suspicious ad or seller, please report it immediately using the "Report" button on
                  the ad page. Our team will investigate and take appropriate action.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>How can I make my ad more visible?</AccordionTrigger>
                <AccordionContent>
                  Use clear, high-quality photos, write detailed descriptions, set competitive prices, and consider
                  using our premium features like featured listings or promoted ads.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
