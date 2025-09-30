import { useState, useRef, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { MessageCircle, Send, Bot, User, Sparkles, TrendingUp, BookOpen, Target } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AICareerAdvisorProps {
  studentData: {
    name: string;
    grade: string;
    interests: string[];
    careerAspiration: string;
    academicStrengths: Array<{subject: string; level: number; category: string}>;
    personalityTraits: Array<{trait: string; level: number; category: string}>;
  };
}

export function AICareerAdvisor({ studentData }: AICareerAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Memoize the welcome message to prevent re-computation
  const welcomeMessage = useMemo(() => {
    const topInterests = studentData.interests.slice(0, 2).join(' and ');
    const topSubject = studentData.academicStrengths[0]?.subject || 'your academic area';
    
    return `G'day ${studentData.name}! I'm your AI Career Advisor, specialising in ${studentData.careerAspiration} and related fields.

Based on your interests in ${topInterests}, I can help you explore career pathways, required skills, university options, and industry insights.

What would you like to know about your career journey?`;
  }, [studentData.name, studentData.careerAspiration, studentData.interests, studentData.academicStrengths]);

  // Initialize with welcome message only once
  useEffect(() => {
    if (!isInitialized) {
      const initialMessage: Message = {
        id: '1',
        content: welcomeMessage,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      setIsInitialized(true);
    }
  }, [welcomeMessage, isInitialized]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    const { careerAspiration, interests, academicStrengths } = studentData;
    const topSubject = academicStrengths[0]?.subject || 'your academic strength';

    // Skills-related questions
    if (lowercaseMessage.includes('skill')) {
      return `For ${careerAspiration} in Australia, key skills include:

**Technical Skills:**
• Programming (Python, JavaScript, Java)
• Problem-solving and analytical thinking
• Database management and cloud platforms

**Soft Skills:**
• Communication and teamwork
• Project management
• Continuous learning mindset

Your strength in ${topSubject} is excellent preparation! Would you like specific course recommendations?`;
    }

    // University/education questions
    if (lowercaseMessage.includes('university') || lowercaseMessage.includes('course')) {
      return `Top Australian pathways for ${careerAspiration}:

**Universities:**
• University of Melbourne - Computer Science
• UNSW Sydney - Software Engineering
• Monash University - Information Technology

**Alternative Options:**
• TAFE programs in software development
• Coding bootcamps
• Industry certifications

Given your performance in ${topSubject}, you're well-positioned for competitive programs. Have you considered any specific universities?`;
    }

    // Salary questions
    if (lowercaseMessage.includes('salary') || lowercaseMessage.includes('pay')) {
      return `Australian salary outlook for ${careerAspiration}:

**Entry Level:** $65,000 - $85,000
**Mid-Level (2-5 years):** $85,000 - $120,000
**Senior Level (5+ years):** $130,000 - $180,000+

The tech industry offers excellent growth potential with strong job security. Salaries vary by city, with Sydney and Melbourne typically offering the highest rates.`;
    }

    // Default response
    return `That's a great question about ${careerAspiration}! Based on your interests in ${interests.join(' and ')}, I'd love to help you explore this further.

Your academic strength in ${topSubject} is valuable in this field. I can provide guidance on:
• Required skills and qualifications
• University courses and pathways
• Job market and salary expectations
• Day-to-day responsibilities

What specific aspect interests you most?`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What skills do I need?",
    "Which universities are best?",
    "What's the salary like?",
    "How do I prepare?",
    "What does the job involve?",
    "What are my options?"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI Career Advisor
            <Badge variant="secondary" className="ml-auto">
              <Sparkles className="h-3 w-3 mr-1" />
              Expert in {studentData.careerAspiration}
            </Badge>
          </CardTitle>
          <CardDescription>
            Get personalised advice about career paths, skills, and opportunities in your field of interest.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <div>
              <div className="font-medium">Market Outlook</div>
              <div className="text-sm text-muted-foreground">Excellent prospects</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <div>
              <div className="font-medium">Pathways</div>
              <div className="text-sm text-muted-foreground">University, TAFE, Apprenticeships</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-600" />
            <div>
              <div className="font-medium">Match Score</div>
              <div className="text-sm text-muted-foreground">Strong alignment</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Chat Interface */}
      <Card className="flex flex-col h-[500px]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Career Guidance Chat
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'ai' ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="mt-4 mb-4">
              <div className="text-sm font-medium mb-2">Try asking:</div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 mt-4">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about skills, pathways, or career advice..."
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isLoading}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}