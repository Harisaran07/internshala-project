import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { userId, email, plan } = await req.json();
    
    if (!userId || !email || !plan) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const session = await createCheckoutSession(userId, email, plan);
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
