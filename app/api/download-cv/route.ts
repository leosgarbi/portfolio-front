import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const fileUrl =
      'https://pub-7f10ef95a92d47ea810f6915e413bdbf.r2.dev/cv_alisson_sgarbi.pdf';

    const response = await fetch(fileUrl);

    if (!response.ok) {
      console.error('Failed to fetch CV from R2:', response.statusText);
      return new NextResponse('Failed to fetch PDF', {
        status: response.status,
      });
    }

    const headers = new Headers();
    headers.set(
      'Content-Disposition',
      'attachment; filename="cv_alisson_sgarbi.pdf"',
    );
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Length', response.headers.get('Content-Length') || '');

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error in download-cv route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
