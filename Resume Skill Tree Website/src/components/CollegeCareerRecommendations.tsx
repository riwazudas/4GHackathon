import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { GraduationCap, MapPin, DollarSign, Clock, TrendingUp, Star, BookOpen, Users } from 'lucide-react';

interface StudentData {
  name: string;
  grade: string;
  interests: string[];
  academicStrengths: Array<{subject: string; level: number; category: string}>;
  gpa: string;
  careerAspiration: string;
}

interface CollegeCareerRecommendationsProps {
  studentData: StudentData;
}

interface College {
  name: string;
  location: string;
  ranking: number;
  acceptanceRate: string;
  tuition: string;
  matchScore: number;
  strengths: string[];
  programs: string[];
  campusLife: string;
}

interface Career {
  title: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  education: string;
  skills: string[];
  workEnvironment: string;
  matchScore: number;
}

interface LearningResource {
  title: string;
  type: 'Course' | 'Book' | 'Platform' | 'Certification';
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  description: string;
}

export function CollegeCareerRecommendations({ studentData }: CollegeCareerRecommendationsProps) {
  const [selectedTab, setSelectedTab] = useState('colleges');

  const getRecommendedColleges = (): College[] => {
    const colleges: College[] = [
      {
        name: "Massachusetts Institute of Technology",
        location: "Cambridge, MA",
        ranking: 1,
        acceptanceRate: "7%",
        tuition: "$53,450",
        matchScore: 95,
        strengths: ["Engineering", "Computer Science", "Research"],
        programs: ["Computer Science", "Electrical Engineering", "Aerospace Engineering"],
        campusLife: "Highly collaborative, innovation-focused environment"
      },
      {
        name: "Stanford University",
        location: "Stanford, CA",
        ranking: 2,
        acceptanceRate: "4%",
        tuition: "$56,169",
        matchScore: 92,
        strengths: ["Technology", "Entrepreneurship", "Research"],
        programs: ["Computer Science", "Engineering", "Business"],
        campusLife: "Entrepreneurial spirit, beautiful campus, diverse student body"
      },
      {
        name: "University of California, Berkeley",
        location: "Berkeley, CA",
        ranking: 3,
        acceptanceRate: "17%",
        tuition: "$14,253 (in-state)",
        matchScore: 88,
        strengths: ["Public Research", "Engineering", "Liberal Arts"],
        programs: ["EECS", "Engineering", "Sciences"],
        campusLife: "Diverse, politically active, research-oriented"
      },
      {
        name: "Carnegie Mellon University",
        location: "Pittsburgh, PA",
        ranking: 4,
        acceptanceRate: "17%",
        tuition: "$57,560",
        matchScore: 90,
        strengths: ["Computer Science", "Engineering", "Arts"],
        programs: ["Computer Science", "Robotics", "Information Systems"],
        campusLife: "Tech-focused, collaborative, interdisciplinary"
      }
    ];

    // Filter based on student interests and strengths
    return colleges.sort((a, b) => b.matchScore - a.matchScore);
  };

  const getRecommendedCareers = (): Career[] => {
    const careers: Career[] = [
      {
        title: "Software Engineer",
        description: "Design, develop, and maintain software applications and systems",
        averageSalary: "$105,000 - $180,000",
        growthRate: "25% (Much faster than average)",
        education: "Bachelor's in Computer Science or related field",
        skills: ["Programming", "Problem Solving", "System Design", "Collaboration"],
        workEnvironment: "Tech companies, startups, remote work options",
        matchScore: 94
      },
      {
        title: "Data Scientist",
        description: "Analyze complex data to help organizations make informed decisions",
        averageSalary: "$95,000 - $165,000",
        growthRate: "35% (Much faster than average)",
        education: "Bachelor's/Master's in Data Science, Statistics, or Computer Science",
        skills: ["Statistics", "Programming", "Machine Learning", "Communication"],
        workEnvironment: "Various industries, research institutions, consulting",
        matchScore: 89
      },
      {
        title: "UX/UI Designer",
        description: "Create user-friendly digital interfaces and experiences",
        averageSalary: "$75,000 - $130,000",
        growthRate: "13% (Faster than average)",
        education: "Bachelor's in Design, HCI, or related field",
        skills: ["Design", "User Research", "Prototyping", "Empathy"],
        workEnvironment: "Design agencies, tech companies, freelance",
        matchScore: 85
      },
      {
        title: "Biomedical Engineer",
        description: "Develop medical devices and solutions for healthcare challenges",
        averageSalary: "$88,000 - $140,000",
        growthRate: "6% (As fast as average)",
        education: "Bachelor's in Biomedical Engineering or related field",
        skills: ["Engineering", "Biology", "Problem Solving", "Innovation"],
        workEnvironment: "Medical device companies, hospitals, research labs",
        matchScore: 82
      }
    ];

    return careers.sort((a, b) => b.matchScore - a.matchScore);
  };

  const getLearningResources = (): LearningResource[] => {
    const resources: LearningResource[] = [
      {
        title: "CS50: Introduction to Computer Science",
        type: 'Course',
        provider: "Harvard University (edX)",
        duration: "12 weeks",
        level: 'Beginner',
        rating: 4.9,
        description: "Comprehensive introduction to computer science and programming"
      },
      {
        title: "Python for Everybody",
        type: 'Course',
        provider: "University of Michigan (Coursera)",
        duration: "8 weeks",
        level: 'Beginner',
        rating: 4.8,
        description: "Learn Python programming from scratch with practical projects"
      },
      {
        title: "The Design of Everyday Things",
        type: 'Book',
        provider: "Don Norman",
        duration: "2-3 weeks",
        level: 'Beginner',
        rating: 4.7,
        description: "Essential reading for understanding user-centered design principles"
      },
      {
        title: "AWS Certified Cloud Practitioner",
        type: 'Certification',
        provider: "Amazon Web Services",
        duration: "3-6 months",
        level: 'Intermediate',
        rating: 4.6,
        description: "Foundational certification for cloud computing knowledge"
      },
      {
        title: "Khan Academy - Computer Programming",
        type: 'Platform',
        provider: "Khan Academy",
        duration: "Self-paced",
        level: 'Beginner',
        rating: 4.5,
        description: "Interactive programming courses and projects"
      }
    ];

    return resources;
  };

  const colleges = getRecommendedColleges();
  const careers = getRecommendedCareers();
  const learningResources = getLearningResources();

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    return "text-yellow-600 bg-yellow-50";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Course': return <BookOpen className="h-4 w-4" />;
      case 'Book': return <BookOpen className="h-4 w-4" />;
      case 'Platform': return <Users className="h-4 w-4" />;
      case 'Certification': return <Star className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations for {studentData.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on your interests in {studentData.interests.slice(0, 2).join(', ')} and your academic strengths
          </p>
        </CardHeader>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colleges" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Colleges
          </TabsTrigger>
          <TabsTrigger value="careers" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Careers
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colleges" className="space-y-4">
          {colleges.map((college, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{college.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {college.location} • Ranking #{college.ranking}
                    </p>
                  </div>
                  <Badge className={`${getMatchColor(college.matchScore)} border-0`}>
                    {college.matchScore}% Match
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Acceptance: {college.acceptanceRate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Tuition: {college.tuition}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Top Programs Available</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recommended Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.programs.map((program) => (
                        <Badge key={program} variant="outline">{program}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Campus Life</h4>
                    <p className="text-sm text-muted-foreground">{college.campusLife}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="careers" className="space-y-4">
          {careers.map((career, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{career.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{career.description}</p>
                  </div>
                  <Badge className={`${getMatchColor(career.matchScore)} border-0`}>
                    {career.matchScore}% Match
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Salary: {career.averageSalary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Growth: {career.growthRate}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Education: {career.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Environment: {career.workEnvironment}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Key Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningResources.map((resource, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <h3 className="font-medium">{resource.title}</h3>
                    </div>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Provider: {resource.provider}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{resource.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Duration: {resource.duration}</span>
                      <Badge variant="secondary" className="text-xs">{resource.level}</Badge>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}