import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { videoData, filename } = await req.json();
    
    if (!videoData) {
      return NextResponse.json({ error: 'No video data provided' }, { status: 400 });
    }

    // Remove base64 prefix
    const base64Data = videoData.replace(/^data:video\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const exportDir = path.join(process.cwd(), 'public', 'export');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const filePath = path.join(exportDir, filename || 'visual_field_artwork.mp4');
    fs.writeFileSync(filePath, buffer);

    console.log(`Video saved successfully at: ${filePath}`);
    return NextResponse.json({ success: true, path: filePath });
  } catch (error) {
    console.error('Error saving video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
