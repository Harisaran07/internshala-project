import { NextResponse } from 'next/server';
import { simulateDraw } from '@/lib/draw';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  const type = searchParams.get('type') as 'random' | 'algorithmic' || 'random';

  if (!month || !year) {
    return NextResponse.json({ error: 'Month and Year are required' }, { status: 400 });
  }

  try {
    const result = await simulateDraw(month, parseInt(year), type);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Draw Simulation Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
