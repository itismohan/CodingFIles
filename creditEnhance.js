import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, TrendingDown, AlertCircle, CheckCircle, Award, Target, 
  BookOpen, Lightbulb, Star, Trophy, Shield, CreditCard, Clock, 
  BarChart3, Info, ChevronRight, Play, Pause, RotateCcw 
} from 'lucide-react';

const AdvancedCreditFeatures = () => {
  const [activeTab, setActiveTab] = useState('contextual');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMilestone, setCurrentMilestone] = useState(2);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // User's actual credit profile data
  const userProfile = {
    currentScore: 785,
    paymentHistory: 96, // percentage
    creditUtilization: 15, // percentage
    creditAge: 5.2, // years
    creditMix: 4, // number of account types
    recentInquiries: 1,
    totalAccounts: 8,
    onTimePayments: 58,
    totalPayments: 60
  };

  // Contextual event explanations with detailed impact analysis
  const contextualEvents = [
    {
      id: 1,
      date: '2024-06',
      title: 'Credit Utilization Increased',
      scoreChange: -15,
      explanation: {
        primary: "Your credit utilization jumped from 8% to 32% this month",
        detailed: "Credit utilization accounts for 30% of your credit score. The ideal utilization is below 10% for excellent scores, and below 30% to avoid significant penalties.",
        calculation: {
          before: { balance: 800, limit: 10000, utilization: 8 },
          after: { balance: 3200, limit: 10000, utilization: 32 },
          impact: "Moving from 'Excellent' (0-10%) to 'Fair' (30%+) utilization tier"
        },
        recovery: {
          action: "Pay down $2,200 to get back to 10% utilization",
          timeline: "Score recovery: 30-60 days after balance reporting",
          expectedGain: "+12 to +18 points"
        },
        relatedConcepts: [
          "Utilization is calculated monthly when statements close",
          "Individual card utilization also matters, not just overall",
          "Paying before statement date can lower reported utilization"
        ]
      }
    },
    {
      id: 2,
      date: '2024-03',
      title: 'New Credit Card Opened',
      scoreChange: +8,
      explanation: {
        primary: "Opening a new card improved your credit mix and available credit",
        detailed: "While new accounts temporarily lower your average account age, the increased available credit improved your utilization ratio from 18% to 12%.",
        calculation: {
          creditMixBonus: 3,
          utilizationImprovement: 8,
          newAccountPenalty: -3,
          netGain: 8
        },
        timeline: "Full positive impact will show in 6-12 months as account ages",
        strategy: "This was a good move because you had high utilization. Avoid opening more accounts for the next 12 months."
      }
    }
  ];

  // Personalized projection engine
  const generatePersonalizedProjection = (scenario, timeframe) => {
    const baseScore = userProfile.currentScore;
    const projections = [];
    
    const factors = {
      conservative: {
        paymentHistoryImprovement: 0.5, // points per month
        utilizationOptimization: scenario === 'conservative' ? 2 : 5,
        accountAgeBonus: 0.8,
        creditMixBonus: 0,
        inquiryRecovery: 2
      },
      aggressive: {
        paymentHistoryImprovement: 1,
        utilizationOptimization: 15, // pay down to <10%
        accountAgeBonus: 0.8,
        creditMixBonus: 5, // add mortgage
        inquiryRecovery: 2,
        additionalOptimizations: 8 // limit increases, etc.
      }
    };

    for (let month = 1; month <= timeframe; month++) {
      let scoreGain = 0;
      const factor = factors[scenario] || factors.conservative;
      
      // Payment history improvement (diminishing returns)
      if (userProfile.paymentHistory < 100) {
        scoreGain += factor.paymentHistoryImprovement * Math.max(0, 1 - month/24);
      }
      
      // Utilization optimization (front-loaded impact)
      if (month <= 3) {
        scoreGain += factor.utilizationOptimization / 3;
      }
      
      // Account age (steady growth)
      scoreGain += factor.accountAgeBonus;
      
      // Inquiry recovery (months 6-12)
      if (month >= 6 && month <= 12) {
        scoreGain += factor.inquiryRecovery / 6;
      }
      
      projections.push({
        month,
        score: Math.min(850, Math.round(baseScore + scoreGain * month)),
        factors: {
          paymentHistory: Math.min(100, userProfile.paymentHistory + (month * 0.2)),
          utilization: Math.max(1, userProfile.creditUtilization - (factor.utilizationOptimization / 6 * month)),
          accountAge: userProfile.creditAge + (month / 12)
        }
      });
    }
    
    return projections;
  };

  // Gamified milestone system
  const milestones = [
    {
      id: 1,
      title: "Credit Builder",
      description: "Establish your credit foundation",
      scoreRange: [580, 669],
      icon: <Shield className="w-6 h-6" />,
      color: "bg-red-500",
      rewards: ["Basic credit cards available", "Secured loan options"],
      completed: true,
      completedDate: "Jan 2021"
    },
    {
      id: 2,
      title: "Fair Credit",
      description: "Access to standard financial products",
      scoreRange: [670, 739],
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-yellow-500",
      rewards: ["Unsecured credit cards", "Auto loans with decent rates", "Apartment rentals easier"],
      completed: true,
      completedDate: "Jun 2022"
    },
    {
      id: 3,
      title: "Good Credit",
      description: "Better rates and premium options",
      scoreRange: [740, 799],
      icon: <Star className="w-6 h-6" />,
      color: "bg-blue-500",
      rewards: ["Premium credit cards", "Better mortgage rates", "Lower insurance premiums"],
      completed: false,
      progress: 85, // 785 out of 799
      nextTarget: 800
    },
    {
      id: 4,
      title: "Excellent Credit",
      description: "Best rates and exclusive products",
      scoreRange: [800, 850],
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-green-500",
      rewards: ["Best mortgage rates (save $50k+)", "Exclusive credit cards", "Premium loan terms"],
      completed: false,
      progress: 0
    }
  ];

  // Educational content system
  const educationalContent = {
    paymentHistory: {
      title: "Payment History (35% of score)",
      yourData: `${userProfile.onTimePayments}/${userProfile.totalPayments} payments on time (${userProfile.paymentHistory}%)`,
      explanation: "Payment history is the most important factor in your credit score. Even one late payment can drop your score 60-100+ points.",
      insights: [
        "You've missed 2 payments in 5 years - excellent track record!",
        "Set up autopay for at least minimums to maintain this strength",
        "Late payments hurt less over time, but stay on report for 7 years"
      ],
      actionable: "Your payment history is already excellent. Focus on maintaining this with autopay systems."
    },
    creditUtilization: {
      title: "Credit Utilization (30% of score)",
      yourData: `Using ${userProfile.creditUtilization}% of available credit`,
      explanation: "This measures how much of your available credit you're using. Lower is almost always better.",
      insights: [
        "Your 15% utilization is good, but under 10% would be excellent",
        "Individual card utilization matters too - keep each under 30%",
        "Pay balances before statement dates to lower reported utilization"
      ],
      actionable: "Pay down $500 more to get under 10% utilization for maximum score benefit."
    },
    creditAge: {
      title: "Length of Credit History (15% of score)",
      yourData: `${userProfile.creditAge} years average account age`,
      explanation: "Longer credit history demonstrates stability and experience managing credit.",
      insights: [
        "Your credit age is still building - this will improve naturally over time",
        "Keep old accounts open, even if you don't use them much",
        "Becoming an authorized user on old accounts can help"
      ],
      actionable: "Time is your friend here. Avoid closing old accounts unnecessarily."
    }
  };

  const CreditFactorPieChart = () => {
    const data = [
      { name: 'Payment History', value: 35, fill: '#10b981' },
      { name: 'Credit Utilization', value: 30, fill: '#3b82f6' },
      { name: 'Credit History Length', value: 15, fill: '#f59e0b' },
      { name: 'Credit Mix', value: 10, fill: '#8b5cf6' },
      { name: 'New Credit', value: 10, fill: '#ef4444' }
    ];

    return (
      <div className="w-64 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Credit Journey Features</h1>
        <p className="text-gray-600">Detailed implementation examples for enhanced user interaction</p>
      </div>

      {/* Feature Navigation */}
      <div className="bg-white rounded-lg p-1 mb-6 flex">
        {[
          { id: 'contextual', label: 'Contextual Explanations', icon: <Info className="w-4 h-4" /> },
          { id: 'projections', label: 'Personalized Projections', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'gamified', label: 'Gamified Progress', icon: <Trophy className="w-4 h-4" /> },
          { id: 'educational', label: 'Educational Content', icon: <BookOpen className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Contextual Explanations */}
      {activeTab === 'contextual' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Contextual Event Explanations
            </h2>
            <p className="text-gray-600 mb-6">
              Each credit event provides deep context about why it impacted your score, how the calculation works, and what you can do about it.
            </p>

            <div className="space-y-4">
              {contextualEvents.map((event) => (
                <div
                  key={event.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedEvent === event.id 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.explanation.primary}</p>
                    </div>
                    <div className={`flex items-center gap-2 ${
                      event.scoreChange > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {event.scoreChange > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="font-medium">{event.scoreChange > 0 ? '+' : ''}{event.scoreChange}</span>
                    </div>
                  </div>

                  {selectedEvent === event.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                      {/* Detailed Explanation */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Why This Happened</h4>
                        <p className="text-sm text-blue-800">{event.explanation.detailed}</p>
                      </div>

                      {/* Calculation Breakdown */}
                      {event.explanation.calculation && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">The Numbers</h4>
                          {event.explanation.calculation.before && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Before:</span>
                                <div className="font-mono">
                                  ${event.explanation.calculation.before.balance.toLocaleString()} / 
                                  ${event.explanation.calculation.before.limit.toLocaleString()} = 
                                  {event.explanation.calculation.before.utilization}%
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-600">After:</span>
                                <div className="font-mono">
                                  ${event.explanation.calculation.after.balance.toLocaleString()} / 
                                  ${event.explanation.calculation.after.limit.toLocaleString()} = 
                                  {event.explanation.calculation.after.utilization}%
                                </div>
                              </div>
                            </div>
                          )}
                          {event.explanation.calculation.impact && (
                            <p className="text-sm text-gray-600 mt-2">
                              Impact: {event.explanation.calculation.impact}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Recovery Plan */}
                      {event.explanation.recovery && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-900 mb-2">Recovery Plan</h4>
                          <div className="space-y-2 text-sm text-green-800">
                            <p><strong>Action:</strong> {event.explanation.recovery.action}</p>
                            <p><strong>Timeline:</strong> {event.explanation.recovery.timeline}</p>
                            <p><strong>Expected Gain:</strong> {event.explanation.recovery.expectedGain}</p>
                          </div>
                        </div>
                      )}

                      {/* Related Learning */}
                      {event.explanation.relatedConcepts && (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h4 className="font-medium text-yellow-900 mb-2">
                            <Lightbulb className="w-4 h-4 inline mr-1" />
                            Pro Tips
                          </h4>
                          <ul className="text-sm text-yellow-800 space-y-1">
                            {event.explanation.relatedConcepts.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Personalized Projections */}
      {activeTab === 'projections' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Personalized Score Projections
            </h2>
            <p className="text-gray-600 mb-6">
              Projections based on your specific credit profile: {userProfile.paymentHistory}% payment history, 
              {userProfile.creditUtilization}% utilization, {userProfile.creditAge} years credit age.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {['conservative', 'aggressive'].map((scenario) => {
                const projection = generatePersonalizedProjection(scenario, 12);
                return (
                  <div key={scenario} className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2 capitalize">
                      {scenario} Approach
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={projection}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[780, 850]} />
                          <Tooltip 
                            formatter={(value, name) => [value, 'Projected Score']}
                            labelFormatter={(month) => `Month ${month}`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke={scenario === 'aggressive' ? '#10b981' : '#3b82f6'}
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm">
                      <p className="font-medium">
                        Projected Score: {projection[projection.length - 1].score}
                      </p>
                      <p className="text-gray-600">
                        Based on your current {userProfile.creditUtilization}% utilization and 
                        {userProfile.paymentHistory}% payment history
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Projection Factors */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Your Profile Impact Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Payment History</div>
                  <div className="text-gray-600">{userProfile.paymentHistory}% on-time</div>
                  <div className="text-green-600 text-xs">Excellent - maintain this</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Credit Utilization</div>
                  <div className="text-gray-600">{userProfile.creditUtilization}%</div>
                  <div className="text-yellow-600 text-xs">Good - optimize to &lt;10%</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Credit Age</div>
                  <div className="text-gray-600">{userProfile.creditAge} years</div>
                  <div className="text-blue-600 text-xs">Building - time will help</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Gamified Progress */}
      {activeTab === 'gamified' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              Credit Score Milestones
            </h2>
            <p className="text-gray-600 mb-6">
              Track your progress through credit tiers and unlock new financial opportunities.
            </p>

            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`border rounded-lg p-4 ${
                    milestone.completed 
                      ? 'bg-green-50 border-green-200' 
                      : milestone.progress 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${milestone.color} text-white`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900 flex items-center gap-2">
                            {milestone.title}
                            {milestone.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </h3>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                          <p className="text-xs text-gray-500">
                            Score Range: {milestone.scoreRange[0]} - {milestone.scoreRange[1]}
                          </p>
                        </div>
                        {milestone.completed && (
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">Completed</div>
                            <div className="text-xs text-gray-500">{milestone.completedDate}</div>
                          </div>
                        )}
                      </div>

                      {milestone.progress !== undefined && !milestone.completed && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress to Excellent Credit</span>
                            <span>{milestone.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${milestone.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Just {milestone.nextTarget - userProfile.currentScore} more points to reach {milestone.nextTarget}!
                          </div>
                        </div>
                      )}

                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Unlocked Benefits:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {milestone.rewards.map((reward, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Award className="w-3 h-3 text-yellow-500" />
                              {reward}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievement Animation */}
            <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Next Achievement
              </h3>
              <p className="mb-4">You're 15 points away from Excellent Credit status!</p>
              <div className="bg-white bg-opacity-20 rounded-full p-4 text-center">
                <div className="text-2xl font-bold">785 → 800</div>
                <div className="text-sm opacity-90">Estimated time: 3-6 months</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Educational Content */}
      {activeTab === 'educational' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Learn Through Your Data
            </h2>
            <p className="text-gray-600 mb-6">
              Understand credit concepts using your actual credit profile and data.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Credit Score Factors */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Your Credit Score Breakdown</h3>
                <CreditFactorPieChart />
              </div>

              {/* Detailed Explanations */}
              <div className="space-y-4">
                {Object.entries(educationalContent).map(([key, content]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{content.title}</h4>
                    <div className="bg-blue-50 p-3 rounded mb-3">
                      <div className="text-sm font-medium text-blue-900">Your Data:</div>
                      <div className="text-sm text-blue-800">{content.yourData}</div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{content.explanation}</p>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-900">Insights:</div>
                      {content.insights.map((insight, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <Lightbulb className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                          {insight}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 p-3 bg-green-50 rounded">
                      <div className="text-sm font-medium text-green-900">Action for You:</div>
                      <div className="text-sm text-green-800">{content.actionable}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Learning Module */}
            <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
              <h3 className="font-semibold mb-2">Interactive Learning</h3>
              <p className="mb-4">See how different actions would affect YOUR specific credit score</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Try Credit Simulator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedCreditFeatures;
