import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/mock/central_inventory.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json({
      success: true,
      data,
      meta: {
        current_page: 1,
        per_page: 20,
        total: data.length,
        total_pages: 1
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: { code: 'LOAD_ERROR', message: 'Failed to load mock data' } }, { status: 500 });
  }
}
