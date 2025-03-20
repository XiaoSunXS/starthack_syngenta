import { Calendar, Droplets, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Location } from '../helpers/types';
import { fetchSprayWindowsData } from '../helpers/getData';

interface SprayWindow {
  date: string;
  value: string | null;
  constraintCodes: string | null;
  colorCode: string;
  recommendationCode: string;
}

interface TimeBlock {
  label: string;
  hours: number[];
  windows: SprayWindow[];
}

const formatDateForDisplay = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const hour = date.getHours();
  if (hour === 12) return '12 PM';
  if (hour === 0) return '12 AM';
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

const getSprayAdvice = (recommendationCode: string): string => {
  switch(recommendationCode) {
    case "1":
      return 'Excellent conditions for spraying. Minimal risk.';
    case "2":
      return 'Good conditions for spraying. Watch conditions.';
    case "3":
      return 'Poor conditions. Not recommended.';
    default:
      return 'Conditions unknown.';
  }
}

const getColorClass = (colorCode: string): string => {
  switch(colorCode) {
    case "#C2C76C":
      return "bg-green-200";
    case "#F2CD74":
      return "bg-yellow-200";
    case "#FFB400":
      return "bg-red-200"; // no okay -> only poor
    case "#FB5438":
    case "#E7B09C":
      return "bg-red-200";
    default:
      return "bg-gray-200";
  }
}

// Group windows into meaningful time blocks
const groupWindowsIntoTimeBlocks = (windows: SprayWindow[]): TimeBlock[] => {
  const timeBlocks: TimeBlock[] = [
    { label: 'Night', hours: [0, 1, 2, 3, 4, 5], windows: [] },
    { label: 'Morning', hours: [6, 7, 8, 9, 10, 11], windows: [] },
    { label: 'Afternoon', hours: [12, 13, 14, 15, 16, 17], windows: [] },
    { label: 'Evening', hours: [18, 19, 20, 21, 22, 23], windows: [] }
  ];

  windows.forEach(window => {
    const hour = new Date(window.date).getHours();
    const targetBlock = timeBlocks.find(block => block.hours.includes(hour));
    if (targetBlock) {
      targetBlock.windows.push(window);
    }
  });

  // Filter out blocks with no windows
  return timeBlocks.filter(block => block.windows.length > 0);
}

export const SprayWindowsCard = ({ location }: { location: Location }) => {
    const [sprayData, setSprayData] = useState<SprayWindow[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchSprayWindows = async () => {
        try {
          const data = await fetchSprayWindowsData({ location });
          setSprayData(data || []);
        } catch (error) {
          console.error('Error fetching spray windows', error);
        } finally {
          setLoading(false);
        }
      }
      
      fetchSprayWindows();
    }, [location]);
    
    if (loading) {
      return <p>Loading spray windows...</p>;
    }

    // Group windows by date
    const groupedByDate = sprayData.reduce((acc, window) => {
      const date = window.date.split(' ')[0]; // Get just the date part
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(window);
      return acc;
    }, {} as Record<string, SprayWindow[]>);
    
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold flex items-center">
            <Droplets className="text-blue-500 mr-2" />
            Spray Windows
          </h3>
          <div className="flex items-center text-sm">

          </div>
        </div>
        
        {(
          // Grouped view by time blocks
          Object.entries(groupedByDate).map(([date, windows]) => {
            const timeBlocks = groupWindowsIntoTimeBlocks(windows);
            
            return (
              <div key={date} className="mb-6">
                <div className="font-medium mb-3">
                  <Calendar className="inline mr-2" size={16} />
                  {formatDateForDisplay(date)}
                </div>
                
                {timeBlocks.map((block, blockIndex) => (
                  <div key={blockIndex} className="mb-4">
                    <div className="text-sm text-gray-600 mb-1 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {block.label} ({block.hours[0]}:00 - {block.hours[block.hours.length-1]}:59)
                    </div>
                    <div className="grid grid-cols-6 gap-1">
                      {block.windows.map((window, i) => {
                        const hour = new Date(window.date).getHours();
                        return (
                          <div key={i} className="relative">
                            <div
                              className={`h-8 rounded ${getColorClass(window.colorCode)} hover:opacity-75 cursor-pointer flex items-center justify-center`}
                              title={`${formatTime(window.date)}: ${getSprayAdvice(window.recommendationCode)}${window.constraintCodes ? `\nConstraints: ${window.constraintCodes}` : ''}`}
                            >
                              <span className="text-xs font-medium">{hour}:00</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })
        )}

        <div className="mt-4 text-sm">
          <div className="font-bold mb-2">Spray Conditions</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-200 rounded mr-2"></div>
                <span>✅ Excellent</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-200 rounded mr-2"></div>
                <span>🙂 Good</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-200 rounded mr-2"></div>
                <span>❌ Poor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}