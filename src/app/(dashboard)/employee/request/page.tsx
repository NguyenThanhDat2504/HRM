import FormModal from '@/components/FormModal';
import LeaveRequestForm from '@/components/forms/RequestForm';
import React from 'react';

export default function RequestLeave() {
  return (
    <div style={{ margin: '0 20px' }}>
      <LeaveRequestForm type="create" />
    </div>
  );
}
