'use client';

import { useOrganizationList } from '@clerk/nextjs';
import { FormEventHandler, useState } from 'react';

export default function CreateOrganization() {
  const { createOrganization } = useOrganizationList();
  const [organizationName, setOrganizationName] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (createOrganization) {
      createOrganization({ name: organizationName });
      setOrganizationName('');
    } else {
      console.error('createOrganization is undefined');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='organizationName'
        value={organizationName}
        onChange={(e) => setOrganizationName(e.currentTarget.value)}
      />
      <button type='submit'>Create organization</button>
    </form>
  );
}
