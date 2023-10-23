import { redirect } from 'next/navigation';
import React from 'react';

function RedirectPage() {
  redirect('/user/account/profile');
}

export default RedirectPage;
