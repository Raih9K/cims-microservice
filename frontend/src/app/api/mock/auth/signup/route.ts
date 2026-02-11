import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/mock/auth_signup.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load mock data' }, { status: 500 });
  }
}
