import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MobileFrame from '@/components/MobileFrame';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Sparkles, CreditCard, Smartphone, Building2, ShieldCheck, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const plans = [
  {
    id: 'psychometric',
    name: 'Psychometric Test',
    price: '₹1,500',
    duration: '/year',
    benefits: ['1 Psychometric Test', 'Basic Score Report', 'Career Suggestions'],
  },
  {
    id: 'psychometric-counselling',
    name: 'Psychometric + Counselling',
    price: '₹3,000',
    duration: '/year',
    popular: true,
    benefits: ['1 Psychometric Test', 'Detailed Report', '1-on-1 Counselling Session', 'Mentor Booking Access'],
  },
  {
    id: 'infocentre',
    name: 'Infocentre Access',
    price: '₹5,000',
    duration: '/year',
    benefits: ['Everything in Counselling', 'Full Career Library', 'Master Class Videos', 'Scholarship Info', '1-on-1 Counselling'],
  },
  {
    id: 'abroad',
    name: 'Abroad Consultancy',
    price: '₹2,500',
    duration: '/year',
    benefits: ['Abroad Counselling', 'University Selection Help', 'Application Support', 'Visa Guidance'],
  },
];

const paymentMethods = [
  { id: 'upi', name: 'UPI', desc: 'Google Pay, PhonePe, Paytm', icon: Smartphone },
  { id: 'card', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
  { id: 'netbanking', name: 'Net Banking', desc: 'All major banks supported', icon: Building2 },
];

const Subscription = () => {
  const navigate = useNavigate();
  const { setSubscription, state } = useApp();
  const [screen, setScreen] = useState<'plans' | 'payment' | 'processing' | 'success'>('plans');
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (state.subscription === plan.id) return;
    setSelectedPlan(plan);
    setScreen('payment');
  };

  const handlePay = () => {
    setScreen('processing');
    setTimeout(() => {
      if (selectedPlan) setSubscription(selectedPlan.id);
      setScreen('success');
    }, 2500);
  };

  const canPay = () => {
    if (!selectedPayment) return false;
    if (selectedPayment === 'upi') return upiId.includes('@');
    if (selectedPayment === 'card') return cardNumber.length >= 16 && cardExpiry.length >= 4 && cardCvv.length >= 3 && cardName.length > 0;
    if (selectedPayment === 'netbanking') return true;
    return false;
  };

  const goBack = () => {
    if (screen === 'payment') { setScreen('plans'); setSelectedPayment(''); }
    else if (screen === 'success') { setScreen('plans'); }
    else navigate(-1);
  };

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-[750px]">
        <div className="px-5 pt-4 pb-3 flex items-center gap-3">
          <button onClick={goBack} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-lg font-bold font-display">
            {screen === 'plans' ? 'Subscription Plans' : screen === 'payment' ? 'Payment' : screen === 'processing' ? 'Processing' : 'Success'}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <AnimatePresence mode="wait">
            {/* Plans Screen */}
            {screen === 'plans' && (
              <motion.div key="plans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-sm text-muted-foreground mb-4">Choose a plan to unlock premium features</p>
                {plans.map((plan, i) => {
                  const isSubscribed = state.subscription === plan.id;
                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`relative p-5 rounded-2xl mb-4 card-elevated-lg ${plan.popular ? 'ring-2 ring-primary' : ''}`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 left-4 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold font-display rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> RECOMMENDED
                        </span>
                      )}
                      <h3 className="font-bold font-display text-foreground text-base">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mt-1 mb-3">
                        <span className="text-2xl font-black font-display text-primary">{plan.price}</span>
                        <span className="text-xs text-muted-foreground">{plan.duration}</span>
                      </div>
                      {plan.benefits.map(b => (
                        <div key={b} className="flex items-center gap-2.5 py-1.5">
                          <div className="w-4 h-4 rounded-full bg-career-green/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-2.5 h-2.5 text-career-green" strokeWidth={3} />
                          </div>
                          <span className="text-xs text-foreground">{b}</span>
                        </div>
                      ))}
                      <Button
                        variant={isSubscribed ? 'outline' : 'hero'}
                        size="default"
                        className="w-full mt-4"
                        onClick={() => handleSelectPlan(plan)}
                        disabled={isSubscribed}
                      >
                        {isSubscribed ? '✓ Subscribed' : 'Subscribe Now'}
                      </Button>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Payment Screen */}
            {screen === 'payment' && selectedPlan && (
              <motion.div key="payment" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                {/* Order Summary */}
                <div className="card-elevated p-4 mb-5">
                  <h3 className="font-bold font-display text-sm text-foreground mb-2">Order Summary</h3>
                  <div className="flex justify-between items-center py-2 border-b border-border/40">
                    <span className="text-sm text-muted-foreground">{selectedPlan.name}</span>
                    <span className="font-bold font-display text-foreground">{selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/40">
                    <span className="text-sm text-muted-foreground">GST (18%)</span>
                    <span className="text-sm text-muted-foreground">Included</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold font-display text-foreground">Total</span>
                    <span className="text-lg font-black font-display text-primary">{selectedPlan.price}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <h3 className="font-bold font-display text-sm text-foreground mb-3">Select Payment Method</h3>
                <div className="space-y-2.5 mb-5">
                  {paymentMethods.map((pm) => {
                    const Icon = pm.icon;
                    const isSelected = selectedPayment === pm.id;
                    return (
                      <button
                        key={pm.id}
                        onClick={() => setSelectedPayment(pm.id)}
                        className={`w-full flex items-center gap-3.5 p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border/40 bg-card shadow-card'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? 'bg-primary/10' : 'bg-muted'}`}>
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="text-left flex-1">
                          <span className="font-bold font-display text-sm text-foreground">{pm.name}</span>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{pm.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary' : 'border-muted-foreground/30'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Payment Details */}
                {selectedPayment === 'upi' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
                    <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="input-field h-12 text-sm"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1.5">Enter your UPI ID linked to Google Pay, PhonePe, or Paytm</p>
                  </motion.div>
                )}

                {selectedPayment === 'card' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mb-5">
                    <div>
                      <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Name on card"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        className="input-field h-12 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                        className="input-field h-12 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value.slice(0, 5))}
                          className="input-field h-12 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold font-display text-muted-foreground mb-1.5 block">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          className="input-field h-12 text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedPayment === 'netbanking' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
                    <p className="text-sm text-muted-foreground mb-3">Popular Banks</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Bank of Baroda'].map(bank => (
                        <button key={bank} className="p-3 rounded-xl bg-card shadow-card border border-border/40 text-sm font-bold font-display text-foreground text-center hover:border-primary/40 transition-all active:scale-[0.97]">
                          {bank}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Security Badge */}
                <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-career-green/8">
                  <ShieldCheck className="w-4 h-4 text-career-green flex-shrink-0" />
                  <p className="text-[10px] text-career-green font-medium">Your payment is secured with 256-bit SSL encryption</p>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                  onClick={handlePay}
                  disabled={!canPay()}
                >
                  Pay {selectedPlan.price} <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {/* Processing Screen */}
            {screen === 'processing' && (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6" />
                <h2 className="text-xl font-bold font-display text-foreground mb-2">Processing Payment</h2>
                <p className="text-sm text-muted-foreground">Please wait while we confirm your payment...</p>
              </motion.div>
            )}

            {/* Success Screen */}
            {screen === 'success' && selectedPlan && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-career-green/15 flex items-center justify-center mb-5">
                  <Check className="w-10 h-10 text-career-green" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-black font-display text-foreground mb-2">Payment Successful!</h2>
                <p className="text-sm text-muted-foreground mb-1">Your subscription to</p>
                <p className="text-lg font-bold font-display text-primary mb-6">{selectedPlan.name}</p>
                <div className="card-elevated p-4 w-full mb-6">
                  <div className="flex justify-between py-1.5">
                    <span className="text-xs text-muted-foreground">Plan</span>
                    <span className="text-xs font-bold text-foreground">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-xs text-muted-foreground">Amount</span>
                    <span className="text-xs font-bold text-foreground">{selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-xs text-muted-foreground">Transaction ID</span>
                    <span className="text-xs font-bold text-foreground">TXN{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-xs text-muted-foreground">Valid Until</span>
                    <span className="text-xs font-bold text-foreground">March 2027</span>
                  </div>
                </div>
                <Button variant="hero" size="lg" className="w-full" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default Subscription;
