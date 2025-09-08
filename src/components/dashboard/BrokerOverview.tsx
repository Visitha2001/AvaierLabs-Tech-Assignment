import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BrokerOverview: React.FC = () => {
  const { brokerInfo } = useStore();

  if (!brokerInfo) {
    return (
      <Card className="h-full bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Broker Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">No broker information available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Broker Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-white text-lg">{brokerInfo.name}</h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{brokerInfo.deals}</p>
              <p className="text-sm text-gray-400">Deals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{brokerInfo.approval_rate}</p>
              <p className="text-sm text-gray-400">Approval Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">${brokerInfo.pending.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">Contact Broker</h4>
          <div className="flex justify-between">
            <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <h4 className="text-sm font-medium text-gray-400 mb-3">E Ardsassist</h4>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrokerOverview;