import React from 'react';

function UserAccountPage({ params }: { params: { slug: string } }) {
  return <div>User Account Page: {params.slug}</div>;
}

export default UserAccountPage;
