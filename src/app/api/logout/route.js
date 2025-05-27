import { NextResponse } from 'next/server';

export async function POST(request) {
  // Clear auth token cookie
  const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });

  // Set the authToken cookie to an empty value and set its expiration date to new Date(0) to effectively delete it
  response.cookies.set('authToken', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  return response;
}
