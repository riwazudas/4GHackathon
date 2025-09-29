import { useState } from 'react';
import { Upload, User, GraduationCap, Trophy, FileText, Users, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

interface StudentDataInputProps {
  onDataSubmit: (studentData: any) => void;
}

export function StudentDataInput({ onDataSubmit }: StudentDataInputProps) {
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    grade: '',
    age: '',
    school: '',
    
    // Academic Performance
    subjects: {
      mathematics: '',
      science: '',
      english: '',
      socialStudies: '',
      arts: '',
      languages: ''
    },
    gpa: '',
    academicRank: '',
    
    // Extracurricular Activities
    sports: [],
    clubs: [],
    leadership: [],
    volunteering: [],
    
    // Interests and Preferences
    interests: [],
    careerAspiration: '',
    workStyle: '',
    
    // Teacher Evaluations
    teacherFeedback: {
      strengths: '',
      improvements: '',
      recommendations: ''
    },
    
    // Parent Input
    parentObservations: '',
    familyExpectations: ''
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = () => {
    // Process the form data and create student profile
    const studentProfile = {
      ...formData,
      // Calculate academic strengths
      academicStrengths: calculateAcademicStrengths(formData.subjects),
      // Determine personality traits from activities and interests
      personalityTraits: analyzePersonalityTraits(formData),
      // Overall profile score
      profileCompleteness: calculateCompleteness(formData)
    };

    onDataSubmit(studentProfile);
  };

  const calculateAcademicStrengths = (subjects: any) => {
    const strengths = [];
    Object.entries(subjects).forEach(([subject, grade]) => {
      if (grade === 'A' || grade === 'A+') {
        strengths.push({
          subject: subject.charAt(0).toUpperCase() + subject.slice(1),
          level: 95,
          category: 'Academic'
        });
      } else if (grade === 'B+' || grade === 'B') {
        strengths.push({
          subject: subject.charAt(0).toUpperCase() + subject.slice(1),
          level: 85,
          category: 'Academic'
        });
      }
    });
    return strengths;
  };

  const analyzePersonalityTraits = (data: any) => {
    const traits = [];
    
    if (data.leadership.length > 0) {
      traits.push({ trait: 'Leadership', level: 90, category: 'Personality' });
    }
    if (data.sports.length > 0) {
      traits.push({ trait: 'Teamwork', level: 85, category: 'Personality' });
    }
    if (data.volunteering.length > 0) {
      traits.push({ trait: 'Empathy', level: 88, category: 'Personality' });
    }
    if (data.clubs.length > 2) {
      traits.push({ trait: 'Social Skills', level: 80, category: 'Personality' });
    }
    
    return traits;
  };

  const calculateCompleteness = (data: any) => {
    let completedFields = 0;
    let totalFields = 0;
    
    // Count filled fields
    Object.values(data).forEach(value => {
      totalFields++;
      if (value && value !== '' && 
          (Array.isArray(value) ? value.length > 0 : true)) {
        completedFields++;
      }
    });
    
    return Math.round((completedFields / totalFields) * 100);
  };

  const interestOptions = [
    'Technology & Programming', 'Science & Research', 'Arts & Design', 
    'Business & Entrepreneurship', 'Healthcare & Medicine', 'Education & Teaching',
    'Sports & Fitness', 'Music & Entertainment', 'Environmental Science',
    'Engineering', 'Social Work', 'Law & Justice'
  ];

  const activityOptions = [
    'Student Council', 'Debate Team', 'Science Club', 'Drama Club',
    'Math Club', 'Art Club', 'Music Band', 'Chess Club', 'Robotics Team',
    'Environmental Club', 'Community Service', 'Sports Teams'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Student Career Profile Assessment
          </CardTitle>
          <CardDescription>
            Help us understand your academic journey, interests, and aspirations to provide personalized career guidance
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Basic
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                Academic
              </TabsTrigger>
              <TabsTrigger value="activities" className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                Activities
              </TabsTrigger>
              <TabsTrigger value="interests" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                Interests
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Feedback
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Current Grade</Label>
                  <Select value={formData.grade} onValueChange={(value) => setFormData({...formData, grade: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <Label htmlFor="school">School Name</Label>
                  <Input 
                    id="school" 
                    value={formData.school}
                    onChange={(e) => setFormData({...formData, school: e.target.value})}
                    placeholder="Your school name"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Subject Grades</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(formData.subjects).map(([subject, grade]) => (
                    <div key={subject}>
                      <Label>{subject.charAt(0).toUpperCase() + subject.slice(1)}</Label>
                      <Select 
                        value={grade} 
                        onValueChange={(value) => setFormData({
                          ...formData, 
                          subjects: {...formData.subjects, [subject]: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C+">C+</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="D">D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gpa">Overall GPA</Label>
                  <Input 
                    id="gpa" 
                    value={formData.gpa}
                    onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                    placeholder="e.g., 3.8"
                  />
                </div>
                <div>
                  <Label htmlFor="rank">Class Rank (if known)</Label>
                  <Input 
                    id="rank" 
                    value={formData.academicRank}
                    onChange={(e) => setFormData({...formData, academicRank: e.target.value})}
                    placeholder="e.g., Top 10%"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Extracurricular Activities</h4>
                <p className="text-sm text-muted-foreground mb-4">Select all activities you participate in:</p>
                <div className="grid grid-cols-2 gap-2">
                  {activityOptions.map((activity) => (
                    <div key={activity} className="flex items-center space-x-2">
                      <Checkbox 
                        id={activity}
                        checked={formData.clubs.includes(activity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({...formData, clubs: [...formData.clubs, activity]});
                          } else {
                            setFormData({...formData, clubs: formData.clubs.filter(c => c !== activity)});
                          }
                        }}
                      />
                      <Label htmlFor={activity} className="text-sm">{activity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="leadership">Leadership Roles</Label>
                <Textarea 
                  id="leadership"
                  value={formData.leadership.join(', ')}
                  onChange={(e) => setFormData({...formData, leadership: e.target.value.split(', ')})}
                  placeholder="e.g., Class President, Team Captain, Club Leader"
                />
              </div>
            </TabsContent>

            <TabsContent value="interests" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Areas of Interest</h4>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox 
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({...formData, interests: [...formData.interests, interest]});
                          } else {
                            setFormData({...formData, interests: formData.interests.filter(i => i !== interest)});
                          }
                        }}
                      />
                      <Label htmlFor={interest} className="text-sm">{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="aspiration">Career Aspiration</Label>
                <Input 
                  id="aspiration"
                  value={formData.careerAspiration}
                  onChange={(e) => setFormData({...formData, careerAspiration: e.target.value})}
                  placeholder="What do you want to become when you grow up?"
                />
              </div>

              <div>
                <Label htmlFor="workStyle">Preferred Work Style</Label>
                <Select 
                  value={formData.workStyle} 
                  onValueChange={(value) => setFormData({...formData, workStyle: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How do you like to work?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="independent">Work independently</SelectItem>
                    <SelectItem value="team">Work in teams</SelectItem>
                    <SelectItem value="leadership">Lead and manage others</SelectItem>
                    <SelectItem value="helping">Help and serve others</SelectItem>
                    <SelectItem value="creative">Creative and artistic work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Teacher Observations</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="strengths">Academic Strengths</Label>
                    <Textarea 
                      id="strengths"
                      value={formData.teacherFeedback.strengths}
                      onChange={(e) => setFormData({
                        ...formData, 
                        teacherFeedback: {...formData.teacherFeedback, strengths: e.target.value}
                      })}
                      placeholder="What are your academic strengths according to teachers?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="improvements">Areas for Improvement</Label>
                    <Textarea 
                      id="improvements"
                      value={formData.teacherFeedback.improvements}
                      onChange={(e) => setFormData({
                        ...formData, 
                        teacherFeedback: {...formData.teacherFeedback, improvements: e.target.value}
                      })}
                      placeholder="What areas do teachers suggest you improve?"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="parent">Parent Observations</Label>
                <Textarea 
                  id="parent"
                  value={formData.parentObservations}
                  onChange={(e) => setFormData({...formData, parentObservations: e.target.value})}
                  placeholder="What do your parents observe about your interests and strengths?"
                />
              </div>

              <div className="pt-4">
                <Button onClick={handleSubmit} className="w-full">
                  Generate Career Profile
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}