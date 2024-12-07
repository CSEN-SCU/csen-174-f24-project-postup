import React from 'react';
import { 
  Book, 
  Clock, 
  CheckCircle, 
  TrendingUp 
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
interface CourseStatsCardProps {
  userPlan: Array<{
    courses: Array<{
      unit?: string | number;
    }>;
  }>;
}
const CourseStatsCard: React.FC<CourseStatsCardProps> = ({ userPlan = [] }) => {
  // Total courses
  const totalCourses = userPlan.reduce((total, quarter) => 
    total + (quarter.courses ? quarter.courses.length : 0), 0);
  // Unique quarters with courses
  const quartersWithCourses = userPlan.filter(quarter => 
    quarter.courses && quarter.courses.length > 0).length;
  // Total units
  const totalUnits = userPlan.reduce((total, quarter) => {
    if (!quarter.courses) return total;
    return total + quarter.courses.reduce((unitTotal, course) => {
      const courseUnit = course.unit ? 
        (typeof course.unit === 'string' ? parseFloat(course.unit) : course.unit) 
        : 0;
      return unitTotal + courseUnit;
    }, 0);
  }, 0);
  // Progress percentage
  const progressPercentage = Math.min(
    Math.round((totalCourses / Math.max(userPlan.length * 4, 1)) * 100), 
    100
  );
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="border-b bg-gray-50 py-3">
        <CardTitle className="text-xl font-bold text-gray-800">
          Course Planning Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Total Courses */}
          <div className="flex items-start space-x-2">
            <Book className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-l text-gray-900">Total Courses</p>
              <p className="text-xl font-bold text-gray-800">{totalCourses}</p>
            </div>
          </div>
          {/* Quarters Planned */}
          <div className="flex items-start space-x-2">
            <Clock className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-l text-gray-900">Quarters Planned</p>
              <p className="text-xl font-bold text-gray-800">{quartersWithCourses}</p>
            </div>
          </div>
          {/* Total Units */}
          <div className="flex items-start space-x-2">
            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-l text-gray-900">Total Units</p>
              <p className="text-xl font-bold text-gray-800">{totalUnits.toFixed(1)}</p>
            </div>
          </div>
          {/* Progress */}
          <div className="flex items-start space-x-2">
            <TrendingUp className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-l text-gray-900">Progress</p>
              <p className="text-xl font-bold text-gray-800">{progressPercentage}%</p>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CourseStatsCard;