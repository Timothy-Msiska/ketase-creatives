'use client';

import { useState } from 'react';
import { Mail, Trash2, Archive } from 'lucide-react';

const mockInquiries = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    company: 'Acme Corp',
    subject: 'Branding Project',
    message: 'Interested in a comprehensive branding redesign...',
    date: '2024-01-15',
    status: 'unread',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    company: 'Tech Startup',
    subject: 'Web Design Request',
    message: 'Looking for UI/UX design for our new platform...',
    date: '2024-01-14',
    status: 'read',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    company: 'Marketing Agency',
    subject: 'Creative Direction',
    message: 'Need creative direction for our campaign...',
    date: '2024-01-13',
    status: 'archived',
  },
];

export default function InquiriesManagementPage() {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [filter, setFilter] = useState('all');

  const filteredInquiries =
    filter === 'all'
      ? inquiries
      : inquiries.filter((i) => i.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-neutral-100 text-neutral-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Contact Inquiries
          </h1>
          <p className="text-muted-foreground">
            Manage and respond to contact form submissions
          </p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['all', 'unread', 'read', 'archived'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === status
                ? 'bg-[#1AA089] text-white'
                : 'bg-white border border-border text-foreground hover:border-[#1AA089]'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Inquiries list */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={`bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all cursor-pointer ${
              inquiry.status === 'unread' ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-heading font-bold text-foreground">
                    {inquiry.name}
                  </h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {inquiry.email}
                  </div>
                  <div>{inquiry.company}</div>
                  <div className="font-semibold text-foreground">{inquiry.subject}</div>
                  <div>{new Date(inquiry.date).toLocaleDateString()}</div>
                </div>

                <p className="text-foreground line-clamp-2">{inquiry.message}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <button className="px-4 py-2 bg-[#1AA089] text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm">
                Reply
              </button>
              <button className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors text-muted-foreground">
                <Archive size={18} />
              </button>
              <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
