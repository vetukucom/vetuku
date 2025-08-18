export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using Vetuku, you accept and agree to be bound by the terms and provision of this
            agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate and truthful information in your listings</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect other users and maintain professional conduct</li>
            <li>Not post prohibited or illegal items</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Prohibited Items</h2>
          <p className="mb-4">The following items are strictly prohibited on our platform:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Illegal drugs and substances</li>
            <li>Weapons and ammunition</li>
            <li>Counterfeit goods</li>
            <li>Adult content and services</li>
            <li>Stolen goods</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Account Termination</h2>
          <p className="mb-4">
            We reserve the right to terminate accounts that violate our terms of service or engage in fraudulent
            activities.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Contact Information</h2>
          <p className="mb-4">For questions about these terms, please contact us at legal@vetuku.com</p>
        </section>
      </div>
    </div>
  )
}
