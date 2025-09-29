import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { 
  Calendar, 
  Clock, 
  Target, 
  BookOpen, 
  Users, 
  Trophy, 
  Lightbulb,
  CheckCircle,
  Circle,
  ArrowRight,
  Star,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Award,
  FileText,
  Code,
  Presentation
} from 'lucide-react';

interface StudentData {
  name: string;
  grade: string;
  interests: string[];
  careerAspiration: string;
  academicStrengths: Array<{subject: string; level: number; category: string}>;
  personalityTraits: Array<{trait: string; level: number; category: string}>;
  subjects: Record<string, string>;
  clubs: string[];
  leadership: string[];
  teacherFeedback: {
    strengths: string;
    improvements: string;
    recommendations: string;
  };
}

interface PathwayStep {
  id: string;
  title: string;
  description: string;
  type: 'academic' | 'skill' | 'activity' | 'milestone' | 'application';
  timeline: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  icon: any;
  category: string;
  estimatedTime: string;
  resources?: string[];
}

interface StudentPathwayPlannerProps {
  studentData: StudentData;
}

export function StudentPathwayPlanner({ studentData }: StudentPathwayPlannerProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [selectedTimeline, setSelectedTimeline] = useState<string>('all');

  // Generate personalized pathway steps based on student data
  const generatePathwaySteps = (): PathwayStep[] => {
    const steps: PathwayStep[] = [];
    
    // Immediate steps (next 3 months)
    steps.push({
      id: 'improve-weak-subjects',
      title: 'Focus on Growth Areas',
      description: `Based on teacher feedback: ${studentData.teacherFeedback.improvements || 'Work on presentation skills and communication'}`,
      type: 'academic',
      timeline: 'immediate',
      priority: 'high',
      completed: false,
      icon: BookOpen,
      category: 'Academic Excellence',
      estimatedTime: '2-3 months',
      resources: ['Khan Academy', 'Study groups', 'Teacher office hours']
    });

    steps.push({
      id: 'join-relevant-clubs',
      title: 'Expand Extracurricular Activities',
      description: `Join clubs related to ${studentData.interests.slice(0, 2).join(' and ')} to build experience`,
      type: 'activity',
      timeline: 'immediate',
      priority: 'high',
      completed: false,
      icon: Users,
      category: 'Leadership & Activities',
      estimatedTime: '1 month to join',
      resources: ['School club directory', 'Club meetings', 'Activity fairs']
    });

    // Short-term steps (3-12 months)
    steps.push({
      id: 'advanced-courses',
      title: 'Enroll in Advanced Courses',
      description: `Take AP/Honors courses in ${studentData.academicStrengths.slice(0, 2).map(s => s.subject).join(' and ')}`,
      type: 'academic',
      timeline: 'short-term',
      priority: 'high',
      completed: false,
      icon: GraduationCap,
      category: 'Academic Excellence',
      estimatedTime: 'Next semester',
      resources: ['Guidance counselor', 'Course catalog', 'Prerequisites check']
    });

    if (studentData.interests.some(interest => 
      interest.toLowerCase().includes('technology') || 
      interest.toLowerCase().includes('engineering') ||
      interest.toLowerCase().includes('programming')
    )) {
      steps.push({
        id: 'coding-skills',
        title: 'Develop Programming Skills',
        description: 'Learn Python and web development fundamentals',
        type: 'skill',
        timeline: 'short-term',
        priority: 'high',
        completed: false,
        icon: Code,
        category: 'Technical Skills',
        estimatedTime: '6-8 months',
        resources: ['Codecademy', 'freeCodeCamp', 'GitHub', 'Local coding bootcamps']
      });
    }

    steps.push({
      id: 'leadership-role',
      title: 'Take on Leadership Position',
      description: 'Seek leadership role in clubs or start a new initiative',
      type: 'activity',
      timeline: 'short-term',
      priority: 'medium',
      completed: false,
      icon: Trophy,
      category: 'Leadership & Activities',
      estimatedTime: '3-6 months',
      resources: ['Current club leadership', 'Faculty advisors', 'Student government']
    });

    // Medium-term steps (1-2 years)
    steps.push({
      id: 'internship-experience',
      title: 'Gain Real-World Experience',
      description: `Pursue internship or job shadowing in ${studentData.careerAspiration.split(' ')[0].toLowerCase()} field`,
      type: 'milestone',
      timeline: 'medium-term',
      priority: 'high',
      completed: false,
      icon: Briefcase,
      category: 'Career Preparation',
      estimatedTime: 'Summer/semester',
      resources: ['Indeed internships', 'LinkedIn', 'Network connections', 'Career services']
    });

    steps.push({
      id: 'standardized-tests',
      title: 'Excel in Standardized Tests',
      description: 'Prepare for and take SAT/ACT with target scores for desired colleges',
      type: 'milestone',
      timeline: 'medium-term',
      priority: 'high',
      completed: false,
      icon: FileText,
      category: 'College Preparation',
      estimatedTime: '6-12 months prep',
      resources: ['Khan Academy SAT', 'Official prep books', 'Practice tests', 'Tutoring']
    });

    steps.push({
      id: 'portfolio-building',
      title: 'Build Portfolio/Projects',
      description: 'Create a portfolio showcasing your best work and projects',
      type: 'skill',
      timeline: 'medium-term',
      priority: 'medium',
      completed: false,
      icon: Presentation,
      category: 'Career Preparation',
      estimatedTime: '8-12 months',
      resources: ['GitHub', 'Personal website', 'Design tools', 'Project documentation']
    });

    // Long-term steps (2+ years)
    steps.push({
      id: 'college-applications',
      title: 'Apply to Target Colleges',
      description: 'Complete applications for colleges aligned with career goals',
      type: 'application',
      timeline: 'long-term',
      priority: 'high',
      completed: false,
      icon: GraduationCap,
      category: 'College Preparation',
      estimatedTime: '6 months process',
      resources: ['Common Application', 'College websites', 'Application essays', 'Letters of recommendation']
    });

    steps.push({
      id: 'scholarship-search',
      title: 'Secure Scholarships & Funding',
      description: 'Apply for scholarships and financial aid opportunities',
      type: 'application',
      timeline: 'long-term',
      priority: 'high',
      completed: false,
      icon: Award,
      category: 'Financial Planning',
      estimatedTime: 'Ongoing process',
      resources: ['FAFSA', 'Scholarship databases', 'Local organizations', 'College financial aid']
    });

    steps.push({
      id: 'career-network',
      title: 'Build Professional Network',
      description: 'Connect with professionals in your field of interest',
      type: 'skill',
      timeline: 'long-term',
      priority: 'medium',
      completed: false,
      icon: Users,
      category: 'Career Preparation',
      estimatedTime: 'Ongoing',
      resources: ['LinkedIn', 'Professional associations', 'Alumni networks', 'Industry events']
    });

    return steps;
  };

  const pathwaySteps = generatePathwaySteps();

  const toggleStepCompletion = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const getTimelineSteps = (timeline: string) => {
    if (timeline === 'all') return pathwaySteps;
    return pathwaySteps.filter(step => step.timeline === timeline);
  };

  const getProgressPercentage = () => {
    return Math.round((completedSteps.size / pathwaySteps.length) * 100);
  };

  const getTimelineProgress = (timeline: string) => {
    const timelineSteps = pathwaySteps.filter(step => step.timeline === timeline);
    const completedTimelineSteps = timelineSteps.filter(step => completedSteps.has(step.id));
    return timelineSteps.length > 0 ? Math.round((completedTimelineSteps.length / timelineSteps.length) * 100) : 0;
  };

  const timelineConfig = {
    immediate: { label: 'Next 3 Months', color: 'bg-red-500', icon: Clock },
    'short-term': { label: 'Next Year', color: 'bg-orange-500', icon: Calendar },
    'medium-term': { label: 'Next 2 Years', color: 'bg-blue-500', icon: Target },
    'long-term': { label: 'Long Term', color: 'bg-green-500', icon: Star }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-600" />
                Your Personalized Career Pathway
              </CardTitle>
              <CardDescription>
                A step-by-step roadmap to achieve your goal of becoming a {studentData.careerAspiration}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{getProgressPercentage()}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={getProgressPercentage()} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{completedSteps.size} of {pathwaySteps.length} steps completed</span>
            <span>{pathwaySteps.length - completedSteps.size} steps remaining</span>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(timelineConfig).map(([key, config]) => {
          const IconComponent = config.icon;
          const progress = getTimelineProgress(key);
          const stepsCount = pathwaySteps.filter(step => step.timeline === key).length;
          
          return (
            <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedTimeline(key)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${config.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{config.label}</h4>
                    <p className="text-sm text-muted-foreground">{stepsCount} steps</p>
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Timeline Selector */}
      <Tabs value={selectedTimeline} onValueChange={setSelectedTimeline}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Steps</TabsTrigger>
          <TabsTrigger value="immediate">Immediate</TabsTrigger>
          <TabsTrigger value="short-term">Short Term</TabsTrigger>
          <TabsTrigger value="medium-term">Medium Term</TabsTrigger>
          <TabsTrigger value="long-term">Long Term</TabsTrigger>
        </TabsList>

        {/* Steps List */}
        <TabsContent value={selectedTimeline} className="space-y-4 mt-6">
          {getTimelineSteps(selectedTimeline).map((step, index) => {
            const IconComponent = step.icon;
            const isCompleted = completedSteps.has(step.id);
            
            return (
              <Card key={step.id} className={`transition-all ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Step Number and Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <IconComponent className="h-6 w-6" />
                        )}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={step.priority === 'high' ? 'destructive' : step.priority === 'medium' ? 'default' : 'secondary'}>
                            {step.priority} priority
                          </Badge>
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={() => toggleStepCompletion(step.id)}
                          />
                        </div>
                      </div>

                      {/* Step Details */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {step.estimatedTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {step.category}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {step.type}
                        </Badge>
                      </div>

                      {/* Resources */}
                      {step.resources && step.resources.length > 0 && (
                        <div className="mt-3">
                          <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                            <Lightbulb className="h-4 w-4" />
                            Helpful Resources:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((resource, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Export Pathway Plan
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Add to Calendar
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Track Progress
        </Button>
      </div>
    </div>
  );
}