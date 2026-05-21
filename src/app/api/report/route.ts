import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, claimTitle, claimContent, sourceUrl, category, fileName } =
      await request.json();

    // Basic Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Nama pelapor wajib diisi.' },
        { status: 400 }
      );
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Email pelapor tidak valid.' },
        { status: 400 }
      );
    }
    if (!claimTitle || !claimTitle.trim()) {
      return NextResponse.json(
        { success: false, error: 'Judul klaim / rumor wajib diisi.' },
        { status: 400 }
      );
    }
    if (!claimContent || !claimContent.trim()) {
      return NextResponse.json(
        { success: false, error: 'Detail deskripsi klaim wajib diisi.' },
        { status: 400 }
      );
    }

    // Generate a beautiful, realistic Ticket ID
    const randomHex = Math.floor(1000 + Math.random() * 9000)
      .toString(16)
      .toUpperCase();
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const ticketId = `CS-AD-${dateStr}-${randomHex}`;

    // Simulate saving to a database
    console.log(`[Database] Saved new report from ${name} (${email}) with Ticket ID: ${ticketId}`);

    return NextResponse.json({
      success: true,
      ticketId,
      message: 'Laporan aduan Anda berhasil diterima oleh sistem verifikasi ceksaha.com.',
      data: {
        name,
        claimTitle,
        category,
        ticketId,
        date: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
    });
  } catch (error) {
    console.error('Error processing report aduan:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan internal pada server kami.' },
      { status: 500 }
    );
  }
}
